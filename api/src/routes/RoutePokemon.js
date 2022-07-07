const {Router} = require('express');
const router = Router();
const {getPokemonDbyApi, getByName} = require('../controllers/ControllerPokemon.js')
const {Pokemon, Type} = require('../db')


router.get('/', async(req,res) => {
   try{ 
        const {name} = req.query
        if(name){
            const nombre = await getByName(name);
            res.send(nombre).status(200)}
        else {
            const allInfo = await getPokemonDbyApi();           
            res.send(allInfo).status(200)}}
    catch(err){
        res.send(err)}
})

router.get('/:id', async(req,res) => {
   
    try{
        const {id} = req.params
        const buscar = await getPokemonDbyApi()
        const resultado = buscar.filter(e => e.id == id)
        if(resultado){
            res.send(resultado).status(200)
        }else{
            res.send("No se encuentra")
        }
    }
    catch(err){
        res.send(err)
    }

})


router.post('/', async(req, res) =>{
    try{
        const {id, name, attack, hp, defense, speed, height, weight, type} = req.body
        const crearPokemon = await Pokemon.create({id, name, attack, hp, defense, speed, height, weight})
        const typePokemon = await Type.findAll({where: {name : type}})
        crearPokemon.addType(typePokemon)
        res.send('Pokemon creado').status(200)
    }
    catch(err){
        res.send(err)
    }
})




module.exports = router;