const express = require('express');
const routes = require('./routes/api')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// setup app
const app = express();
// connect to db 
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'))
// middleware
app.use(bodyParser.json());
// routes
app.use('/api',routes)
// error handle
app.use(function(err,req,res,next){
    // console.log('err',err);
    res.status(422).send({error:err.message})
})
// listen
app.listen(process.env.port || 4000,function(){
    console.log('starting server');
})
