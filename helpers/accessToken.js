const jwt = require('jsonwebtoken');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/'+ process.env.NODE_ENV);

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({'message': 'Unauthorized' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
        'error': true,
        'message': 'No token'
    });
  }
}