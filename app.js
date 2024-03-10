const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')


//load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

//MIDDLEWARE
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs')

//Handlebars
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
}, defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Set global vars
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

//STATIC
app.use(express.static('public'))

//LOGGING
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

//ROUTES
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))