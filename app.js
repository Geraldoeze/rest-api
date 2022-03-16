const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feed');

const app = express();

const MONGODB_URI =
"mongodb+srv://gerald:GZ3r0pV0toPBWmCV@node-cluster.uktzq.mongodb.net/lists?retryWrites=true&w=majority";


app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    //CORS error handler
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})

app.use('/feed', feedRoutes)

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(4500); 
    })
    .catch(err => console.log(err))
