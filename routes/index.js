const express = require('express');
const router = express.Router();
const middlewares = require('../helpers/middlewares');

router.use(require('./api/auth'));
router.use(require('./api/postActions'));

router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;