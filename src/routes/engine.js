const EngineCtrl = require('../controllers/engine');
const router = require('express').Router();
//const authMiddleware = require('../middlewares/authMiddleware')

module.exports = function () {
router.post('engine/create', EngineCtrl.create);
router.post('engine/getAll', EngineCtrl.getAll)
router.patch('engine/:update', EngineCtrl.updateEngine);
router.delete('engine/:delete', EngineCtrl.deleteEngine);
return router;

}