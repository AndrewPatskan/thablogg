'use strict';
class config {
    constructor() {
        this.host = process.env.HOST || 'localhost';
        this.port = process.env.PORT || 7777;
        this.domen = `${this.host}:${this.port}`;
        this.serverUri = `http://${this.domen}`;
    }
};

export default new config();