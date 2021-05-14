const categoriesRoutes = require('./categories.routes')
const authRoutes = require('./auth.router')
const adminRoutes = require('./admin.router')
const passport = require('passport')

module.exports = (router) => {
    router.use(passport.initialize())
    router.use(passport.session())
    router.use(categoriesRoutes())
    router.use(authRoutes())
    router.use(adminRoutes())

    return router;

}