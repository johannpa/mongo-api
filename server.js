const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const server = express();

mongoose.Promise = global.Promise;
server.use(bodyParser.json());
server.set('json spaces', 2);
routes(server);

server.listen(3050, () =>{
    console.log("Ecoute sur le port 3050");
    mongoose.connect('mongodb://localhost/user_api_database', {
        useMongoClient:true
    });

    mongoose.connection
        .once('open', () => console.log("Connexion à mongoDB établie"))
        .on('error',(error) => {
            console.warn('Warning', error);
        });
})
