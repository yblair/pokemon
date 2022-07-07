const axios = require('axios');
const {Type} = require('../db');

const getTypes = async() => {
    try{
        const allTypes = await Type.findAll();
        if(!allTypes.lenght){

            const types = await axios('https://pokeapi.co/api/v2/type');
            const pokemonTypes = types.data.results
            
            await Type.bulkCreate(pokemonTypes)
            console.log(pokemonTypes)
            return pokemonTypes
        }
        return allTypes
        
    }
    catch(err){return err}
}




module.exports = {getTypes}