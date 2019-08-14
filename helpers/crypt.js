const crypto = require('crypto');

module.exports = {

    _crypt(txt, alg='sha265'){
        return crypto.createHash(alg).update(txt).digest('hex');      
    },

    toSha256(txt){
        return this._crypt(txt,'sha256');
    }
};