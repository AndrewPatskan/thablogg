const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/', function (req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const login = req.body.login;
    const password = req.body.password;
 
  if(firstname && lastname && login && password){
      user.signup(firstname, lastname, login, password);
      res.send('success');
  }
  else{
    const err = new Error('wrong data');
    return next(err);
  }
  });

router.post('/signin', function (req, res, next) {
    const login = req.body.login;
    const password = req.body.password;
        user.signin(login, password, function(result){
        if(result){
            res.send('success');
          }
          else{
            const err = new Error('wrong data');
            return next(err);
          }
    });
    
  });

module.exports = router;