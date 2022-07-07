const axios = require('axios');
const {Pokemon, Type} = require('../db');

//traer 40 pokemones
const getPokemons = async() => {
    try{
    const pokemons20 = await axios('https://pokeapi.co/api/v2/pokemon'); //me traigo la primer pagina
    const pokemons40 = await axios('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'); //voy a la segunda pagina
    //const pokemons = pokemons20.data.results.concat(pokemons40.data.results); //junto la info de las dos paginas
      const p20 = pokemons20.data.results;
      const p40 = pokemons40.data.results;
      const pokemons = p20.concat(p40) //devuelve un array de obj con url
      //tengo que entrar en cada obj y devolver el name y la info 
      for (let p of pokemons) {
        let url = await axios(p.url);
        //delete p.url;
        p.name = url.data.name
        p.id = url.data.id;
        p.img = url.data.sprites.other.home.front_default;
        p.hp = url.data.stats[0].base_stat;
        p.attack = url.data.stats[1].base_stat;
        p.defense = url.data.stats[2].base_stat;
        p.speed = url.data.stats[5].base_stat;
        p.height = url.data.height;
        p.weight = url.data.weight;
        p.type = url.data.types.map((el) => el.type.name);
      }

    
    return pokemons}
    catch(err){return err}
}

const getPokemonDbyApi = async() => {
  const pokemonDb = await Pokemon.findAll();
  const pokemonApi = await getPokemons();
  const todo = pokemonDb.concat(pokemonApi)
  return todo
}

const getByName = async(name) => {
  //traer el nombre 
  //buscar en la bdd
  //buscar en la api
  try{
    const pokemonNameDb = await Pokemon.findOne({
      where: {name : name},
      include: { model: Type, attributes: ["name"], through: { type: [] } },
    })
    if(pokemonNameDb) return pokemonNameDb
    else {
      const findbynamepokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if (findbynamepokemon.data) {
        const p = findbynamepokemon.data;
        const pokemonName = {
          name: name,
          id: p.id,
          img: p.sprites.other.home.front_default,
          hp: p.stats[0].base_stat,
          strength: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
          type: p.types.map((e) => e.type.name),
        };
        return pokemonName;
      }
    }
  }
  catch(err){return err}
}





module.exports= { getByName, getPokemonDbyApi}
