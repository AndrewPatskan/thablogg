const express = require('express');
const router = express.Router();

router.use(require('./api/auth'));
router.use(require('./api/postActions'));

module.exports = router;