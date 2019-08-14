const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const MODELS = require('../constants/models');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/'+ process.env.NODE_ENV);

const db = mongoose.connection;

const schema = new Schema({
    title: {
        type: String
    },

    subject: {
        type: String
    },
    
    author: {
        type: String
    }
}, {
    collection: 'posts',
    ...config.mongo.modelConfig
});

module.exports = db.model(MODELS.POST, schema);