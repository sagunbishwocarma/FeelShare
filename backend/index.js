const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser')

// connecting the database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database is connected'))
.catch((err) => console.log('Database is not connected', err))


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/routeAuthen'))

const port = 8000;
app.listen(port, () => console.log(port))