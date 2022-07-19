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
        p.image = url.data.sprites.other.home.front_default;
        p.hp = url.data.stats[0].base_stat;
        p.attack = url.data.stats[1].base_stat;
        p.defense = url.data.stats[2].base_stat;
        p.speed = url.data.stats[5].base_stat;
        p.height = url.data.height;
        p.weight = url.data.weight;
        p.types = url.data.types.map((el) => el.type.name);
      }

    console.log(pokemons)
    return pokemons}
    catch(err){return err}
}

const getDbInfo = async() => {
  try {
  return await Pokemon.findAll({
      attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image'],
      include: {
          model: Type,
          attributes: ['name'],
          through: {
              attributes: []
          }
      }
  })
} catch(e) {
  console.log(e)
}  
} 




const getPokemonDbyApi = async() => {
  const pokemonDb = await getDbInfo();
  const pokemonApi = await getPokemons();
  
  const todo = pokemonDb.concat(pokemonApi)
  return todo
}









module.exports= {getPokemonDbyApi}
