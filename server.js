require('dotenv').config()

const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const playersRouter = require('./routes/players')
app.use('/players', playersRouter)

app.listen(3000, ()=>{
    console.log("Server Started")
})

