const express = require("express")
const app = express();
require('dotenv').config()
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) 

const protocol = process.env.PROTOCOL || "http"
const ip = require('ip').address()
const port = process.env.PORT || 8080


//Router

const indexRoute = require('./routes/index')
const itemRoute = require('./routes/item')
const searchRoute = require('./routes/search')

//Use Routes

app.use('/', indexRoute)
app.use('/item', itemRoute)
app.use('/search', searchRoute)

app.listen(port, () => console.log(
    `Server start in localhost:${port} or ${protocol}://${ip}:${port}` 
))