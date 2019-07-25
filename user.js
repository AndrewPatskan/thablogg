const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb+srv://AndrewP:<password>@cluster0-fejao.mongodb.net/test?retryWrites=true&w=majority';
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

exports.signup = (firstname,lastname,login,password)=>{
    mongoClient.connect(function(err, client) {
        const db = client.db('ThaBlogg');
        const collection = db.collection('user');
        collection.insertOne( {
            "firstname": firstname,
            "lastname": lastname,
            "login": login,
            "password": password
        },function(err, result){
            assert.equal(err, null);
            console.log("Saved the user sign up details.");
            console.log(result.ops);
        });
    });
}

exports.signin = (login,password,callback) => {
    mongoClient.connect(function(err, client) {
        const db = client.db('ThaBlogg');
        const collection = db.collection('user');
        collection.findOne( {
            "login": login,
            "password": password
        },function(err, result){
            assert.equal(err, null);
            if(result==null){
                callback(false);
            }
            else{
                callback(true);
            }
        });
    });
}