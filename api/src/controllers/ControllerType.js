const axios = require('axios');
const {Type} = require('../db');

 const getApi = async() => {
    const types = await axios('https://pokeapi.co/api/v2/type');
    const pokemonTypes = types.data.results.map((e) => e.name)
    return pokemonTypes
} 



const getTypes = async() => {
    try{
        const allTypes = await Type.findAll();
        if(!allTypes.lenght){
            const pedir = await getApi()
            pedir.forEach(async (type) => {
                 await Type.findOrCreate({ where: { name: type } });
              })
           
           
            return pedir
        }
        return allTypes
        
    }
    catch(err){return err}
}




module.exports = {getTypes}