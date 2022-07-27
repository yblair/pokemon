const axios = require('axios');
const {Pokemon, Type} = require('../db');

//traer 40 pokemones
const getPokemons = async() => {
    try{
    let arrayPokemons=[]
    const pokemons20 = await axios('https://pokeapi.co/api/v2/pokemon'); 
    const pokemons40 = await axios('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'); 
    
    const p20 = pokemons20.data.results.map(e => axios(e.url));
    const p40 = pokemons40.data.results.map(e => axios(e.url));
    const pokemons = p20.concat(p40) 
     
    const result = await Promise.all(pokemons).then(e => { 
        e.map(p => {  arrayPokemons.push({
        name: p.data.name,
        id : p.data.id,
        image : p.data.sprites.other.home.front_default,
        hp : p.data.stats[0].base_stat,
        attack : p.data.stats[1].base_stat,
        defense : p.data.stats[2].base_stat,
        speed : p.data.stats[5].base_stat,
        height : p.data.height,
        weight : p.data.weight,
        types : p.data.types.map((e) => e.type.name)
      })
    })

    return arrayPokemons
  })
  
  return result

  }

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
