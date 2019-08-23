const { VALIDATION } = require('../constants/regExp');
const crypt = require('../helpers/crypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/' + process.env.NODE_ENV);

const error = require('../helpers/error');

module.exports = {
    signIn: async (req, res, next) => {
      try {
        const { email, password } = req.body;

        if(!email){
          throw error.notEnoughtParams();
        }
          
        if(!password){
          throw error.notEnoughtParams();
        }

        const userModel = await User.findOne({email});
 
        if(!userModel){
          throw error.wrongEmail();
        }

        if (userModel.password !== crypt.toSha256(password)) {
          throw error.wrongPassword();
        }
        const token = jwt.sign({email: userModel.email}, config.secret, { expiresIn: '1d' });

        result = {
          email: userModel.email,
          auth: true,
          token: token
        };

        res.status(200).send(result);

      }
      catch(err){
        next(err);
      };
    
      },

    signUp: async (req, res, next) => {
      try {
        const { firstname, lastname, email, password} = req.body;
    
      if(!VALIDATION.EMAIL.test(email)){
        throw error.emailNotValid();
      }
    
      if(!VALIDATION.PASSWORD.test(password)){
        throw error.passwordNotValid();
      }
    
      if(!firstname && !lastname && !email && !password){
        throw error.notEnoughtParams();
      }

      const user = await User.findOne({ email });
      
      if(!user){
        const newUser = new User({
          firstname,
          lastname,
          email,
          password: crypt.toSha256(password)
        });
  
        const nUser = await newUser.save();
        if(!nUser){
          throw error.serverError();
        }
        res.status(200).send('user registered');
      }
      else {
        throw error.emailNotValid();
    }
    } catch(err) {
        next(err);
      };
  }

      
}