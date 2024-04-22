const login = require('./login.js')
const register = require('./register.js')
const profile = require('./profile.js')
const home = require('./home.js')
const categories = require('./categories.js')
const menuItem = require('./menu.js')
const users = require('./users.js')
const order = require('./order.js')
function route(app) {
    // admin
    app.use('/',home)
    app.use('/login',login)
    app.use('/profile',profile)
    app.use('/register',register)
    app.use('/categories',categories)
    app.use('/menu-items',menuItem)
    app.use('/users',users)
    app.use('/orders',order)
}
module.exports = route