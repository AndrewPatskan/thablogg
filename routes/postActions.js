const express = require('express');
const router = express.Router();
const posts = require('../models/posts');

router.post('/getpostwithid', function(req,res){
    const id = req.body.id;
    posts.getPostWithId(id, function(result){
      res.send(result);
    })
  });

router.post('/deletepost', function(req,res){
    const id = req.body.id;
    posts.deletepost(id, function(result){
      res.send(result);
    })
  });

router.post('/posts', function (req, res,next) {
  posts.showpost(function(result){
    res.send(result);
  });
});

router.post('/addpost', function (req, res) {
  console.log(req.body.id);
  const title = req.body.title;
  const subject = req.body.subject;
  const author = req.body.author;
  const id = req.body.id;
  if(!id){
    posts.addpost(title, subject, author, function(result){
      res.send(result);
  }); 
}
  else{
    posts.updatepost(id, title, subject, author, function(result){
      res.send(result);
      console.log('updated');
  }); 
}
});

module.exports = router;