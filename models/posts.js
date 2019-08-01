const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const assert = require('assert');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
    //process.env.NODE_ENV = 'production';
  }
const config = require('../config/'+ process.env.NODE_ENV);

const url = config.mongo.connectionString;

const mongoClient = new MongoClient(url, config.mongo.connectOptions);

exports.addpost = (title,subject,author,callback)=>{
    mongoClient.connect(function(err, client) {
        const db = client.db('ThaBlogg');
        const collection = db.collection('posts');
        collection.insertOne( {
            "title": title,
            "subject": subject,
            "author": author
        },function(err, result){
            assert.equal(err, null);
            console.log("Saved the users post");
            if(err == null){
                callback(true);
            }
            else{
                callback(false);
            }
        });
    });
};

exports.showpost = (callback)=>{
    mongoClient.connect(function(err, client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.find().toArray(function (err, list) {
            callback(list);
            console.log(list);
        });
    });
}

exports.deletepost = (id, callback)=>{
    mongoClient.connect(function(err,client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.deleteOne({
            _id: new ObjectID(id)
         })
         .then((result)=>{
             return callback(result);
         })
         .catch((err)=>{
            return callback(err);
         })
    });
}

exports.getPostWithId = (id, callback)=>{
    mongoClient.connect(function(err,client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.findOne({
            _id: new ObjectID(id)
         })
         .then((result)=>{
             return callback(result);
         })
         .catch((err)=>{
            return callback(err);
         })
    });
}

exports.updatepost = (id, title, subject, author, callback)=>{
    mongoClient.connect(function(err,client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.updateOne({ _id : new ObjectID(id) },
        { $set: 
            { 'title' : title,
              'subject' : subject,
              'author' : author
            }
        })
         .then((result)=>{
             return callback(result);
         })
         .catch((err)=>{
            return callback(err);
         })
    });
}