const categoriesRoutes = require('./categories.routes')
const authRoutes = require('./auth.router')

module.exports = (router) => {

    router.use(categoriesRoutes())
    router.use(authRoutes())

    return router;

}