'use strict';

module.exports = new class {
    constructor() {
        this.mongo = {
            dbName: 'ThaBlogg',
            modelConfig: {
                versionKey: false,
                timestamps: true
            },
            // connectionString: 'mongodb://' + this.domen + '/ThaBlogg',
            connectionString: `mongodb+srv://AndrewP:25122012st@cluster0-fejao.mongodb.net/test?retryWrites=true&w=majority`,

            connectOptions: {
                //user           : process.env.DB_USER,
                //pass           : process.env.DB_PASS,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
            // uri: '',
            // user: ''
        };
        
        this.secret = 'superpupersecret';
        this.host = process.env.HOST || 'localhost';
        this.port = process.env.PORT || 7777;
        this.domen = this.host + this.port;
        this.serverUri = `https://${this.domen}`;
    }
}();