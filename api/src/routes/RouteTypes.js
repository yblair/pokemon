const {Router} = require('express');
const router = Router();
const {getTypes} = require('../controllers/ControllerType.js')

router.get('/', async(req,res) => {
    try{    
        const types = await getTypes()
        if(types.length){res.send(types).status(200)}
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router