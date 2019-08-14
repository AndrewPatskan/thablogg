const express = require('express');
const router = express.Router();
const { VALIDATION } = require('../constants/regExp');
const crypt = require('../helpers/crypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/' + process.env.NODE_ENV || 'development');

router.post('/', function (req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = crypt.toSha256(req.body.password);

  if(!VALIDATION.EMAIL.test(email)){
    const err = new Error('wrong data');
    return next(err);
  }

  if(!VALIDATION.PASSWORD.test(password)){
    const err = new Error('wrong data');
    return next(err);
  }

  if(firstname && lastname && email && password){
    User.findOne({ email })
    .then(user => {
      if(user){
        const err = new Error('emailexists');
        return next(err);
      }

      const newUser = new User({
        firstname,
        lastname,
        email,
        password
      });
      newUser.save()
        .then(result=>{
          res.send('success');
        })
        .catch(err=>{
          return next(err);
        })
    })
  }
  else{
    const err = new Error('wrong data');
    return next(err);
  }
  });

router.post('/signin', function (req, res, next) {
    const email = req.body.email;
    const password = crypt.toSha256(req.body.password);
    User.findOne({email, password},(err,result)=>{
      if(result===null){
        return next(err);
      }
          const token = jwt.sign({email: result.email}, config.secret, {
            expiresIn: '1d'
          });
          result = {
            email: email,
            auth: true,
            token: token
          }
          res.status(200).send(result);
    });

  });

module.exports = router;