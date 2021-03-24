const carSubCtrl = require('../controllers/carSubController');
const router = require('express').Router();
//const authMiddleware = require('../middlewares/authMiddleware')

module.exports = function () {
router.post('car/sub/create', carSubCtrl.create);
router.post('car/sub/getAll', carSubCtrl.getAll)
router.patch('car/sub/:update', carSubCtrl.updateCarSub);
router.delete('car/sub/:delete', carSubCtrl.deleteCarSub);
return router;

}