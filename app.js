const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

//load config
dotenv.config({ path: './config/config.env'})

connectDB()

//MIDDLEWARE
const app = express()

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//STATIC
app.use(express.static('public'))

//LOGGING
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

//ROUTES
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))