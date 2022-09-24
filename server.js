require('dotenv').config()

const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const playersRouter = require('./routes/players')
app.use('/players', playersRouter)


app.listen(process.env.PORT||3000, ()=>{
    console.log("Server Started")
})

module.exports = app;