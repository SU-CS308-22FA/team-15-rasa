const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const routes = require('./routes/users.route.js');
const usersDAO = require('./dao/usersDAO.js');

const app = express();
const PORT = process.env.PORT || 5000;

const MongoClient = mongodb.MongoClient;
const uri = process.env.USERS_DB_URI || "mongodb+srv://rasaReadWrite:T9AxKEQTnw5gYn0B@rasacluster.dxdtcrw.mongodb.net/users?retryWrites=true&w=majority";

MongoClient.connect(
    uri
).catch(err => {
    console.error(err.stack) // log error
    process.exit(1) // exit with error
}).then(async client => {
    await usersDAO.injectDB(client)
    app.use(cors());
    app.use(express.json());

    app.use('/api/v1/users', routes);
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    }
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})
