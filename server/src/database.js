const mongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
const connect = (cb) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db('filesharing');
        return cb(err, db);
    });
}

module.exports = connect;