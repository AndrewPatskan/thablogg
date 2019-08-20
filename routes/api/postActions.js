const express = require('express');
const router = express.Router();
const checkAuth = require('../../helpers/accessToken');
const postsHandler = require('../../handlers/postsHandler');

router.use(checkAuth);

router.post('/getpostwithid', postsHandler.getPost);

router.post('/deletepost', postsHandler.deletePost);
  
router.post('/posts', postsHandler.showAll);

router.post('/addpost', postsHandler.addPost);

module.exports = router;