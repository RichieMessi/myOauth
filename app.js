const express           = require('express')
const authRoutes        = require('./routes/auth-routes')
const profileRoutes     = require('./routes/profile-routes')
const passportSetup     = require('./config/passport-setup')
const mongoose          = require('mongoose')
const keys              = require('./config/keys')
const cookiesSession    = require('cookie-session')
const passport          = require('passport')
const session           = require('express-session')
const Schema            = mongoose.Schema

const PORT = process.env.port || 3000

const app = express()

// set up view engine 
app.set('view engine', 'ejs')



app.use(cookiesSession({
    // maxAge: 24 * 60 * 60 * 1000,
    maxAge: 24 * 60 * 60 *1000,
    keys: ['IamaReactDeveloper']
}))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())


/*  METHOD DEPRACTRED... THE BELOW ONE WORKS  */
// Connect to mongoDB
// mongoose.connect(keys.mongodb.dbURI, () => {
//     console.log('mongo connection successfull')
// })

mongoose.connect('mongodb://test:test@ds135547.mlab.com:35547/oauth-test',{ useMongoClient: true}, () => {
    console.log('mongo connection successfull')
})

// setup routes
app.use('/auth',authRoutes)
app.use('/profile/',profileRoutes)

// create home page
app.get('/', (req, res) => res.render('home', {user: req.user}))


// listening to port
app.listen(PORT, () => console.log('Listening at port 3000'))