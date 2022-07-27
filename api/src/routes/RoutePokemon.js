const {Router} = require('express');
const router = Router();
const {getPokemonDbyApi} = require('../controllers/ControllerPokemon.js')
const {Pokemon, Type} = require('../db')


router.get('/', async(req,res) => {
   try{ 
        const {name} = req.query
        const nombre = await getPokemonDbyApi()
        if(name){
            const resultado = await nombre.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            resultado.length ? res.status(200).send(resultado):
            res.status(400).json({ msg: "No se encontro el pokemon solicitado" });} 
        else {              
            res.send(nombre).status(200)}}
    catch(err){
        res.send(err);}
})


router.get('/:id', async(req,res) => {
   
    try{
        const {id} = req.params
        const buscar = await getPokemonDbyApi()
        const resultado = buscar.filter(e => e.id == id)
        if(resultado){
            res.send(resultado).status(200)
        }else{
            res.status(400).json({ msg: "No se encontro el pokemon solicitado" })
        }
    }
    catch(err){
        res.send(err)
    }

})


 router.post('/', async(req, res) =>{
    try{
        const {id, name, attack, hp, defense, speed, types, height, weight, image} = req.body
        const crearPokemon = await Pokemon.create({id, name, attack, hp, defense, speed, height, 
            image: image ? image : 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/201.png', weight})
        const typePokemon = await Type.findAll({where: {name : types}})
        crearPokemon.addType(typePokemon)
        res.send(crearPokemon).status(200)
    }
    catch(err){
        res.send(err)
    }
}) 






module.exports = router;