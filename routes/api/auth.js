const express = require('express');
const router = express.Router();
const authHandler = require('../../handlers/authHandler');

// registration
router.post('/', authHandler.signUp);

// log in
router.post('/signin', authHandler.signIn);

module.exports = router;