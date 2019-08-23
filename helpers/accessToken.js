const jwt = require('jsonwebtoken');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/'+ process.env.NODE_ENV);
const errorHandler = require('../helpers/error');

module.exports = async (req,res,next) => {
  try{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
      throw errorHandler.forbidden();
    }
    const accToken = await jwt.verify(token, config.secret);

    if(!accToken){
      throw errorHandler.unAuthorized();
    }
    //req.decoded = decoded;
    next();
    
  } catch(e){
    next(e);
  }

}