const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const MODELS = require('../constants/models');
const ROLES = require('../constants/roles');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/'+ process.env.NODE_ENV);

const db = mongoose.connection;

const schema = new Schema({
    firstname: {
        type: String,
    },

    lastname: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        default: ''
    },

    accessRole: {
        type: Number,
        emum: [ROLES.ACCESS_ROLES.ADMIN, ROLES.ACCESS_ROLES.USER],
        default: ROLES.ACCESS_ROLES.USER
    },

    accessToken: {
        type: String,
    }
}, {
    collection: 'user',
    ...config.mongo.modelConfig
});

module.exports = db.model(MODELS.USER, schema);