const categoriesRoutes = require('./categories.routes')
const authRoutes = require('./auth.router')
const adminRoutes = require('./admin.router')
const menuRoutes = require('./menu.router')
const userRoutes = require('./user.router')
const passport = require('passport')

module.exports = (router) => {
    router.use(passport.initialize())
    router.use(passport.session())
    router.use(categoriesRoutes())
    router.use(authRoutes())
    router.use(adminRoutes())
    router.use(menuRoutes())
    router.use(userRoutes())
    return router;

}