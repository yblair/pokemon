const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RoutePokemon = require('./RoutePokemon.js')
const RouteTypes = require('./RouteTypes.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', RouteTypes)
router.use('/pokemons' , RoutePokemon)


module.exports = router;
