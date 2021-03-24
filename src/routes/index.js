
const carSubRoutes = require('../routes/carSubRoutes');
const engineRoutes = require('../routes/engine')

module.exports = (router) => {
    router.use('/v1', carSubRoutes())
    router.use('/v1', engineRoutes())

    return router;
}