const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const checkAuth = require('../helpers/accessToken');

router.post('/getpostwithid', checkAuth, function(req,res){
    const id = req.body.id;
    Posts.findById(id)
    .then(result=>{
      res.send(result);
    })
    .catch(err=>{
      return next(err);
    });
  });

router.post('/deletepost', checkAuth, function(req,res){
    const id = req.body.id;
    Posts.findByIdAndRemove(id)
    .then(result=>{
      res.send(result);
      console.log('deleted');
    })
    .catch(err=>{
      return next(err);
    });
  });
  
router.post('/posts', checkAuth,function (req, res,next) {
  Posts.find()
  .then(result=> {
    res.send(result);
  })
  .catch(err=> {return next(err);});
});

router.post('/addpost', checkAuth, function (req, res) {
  const title = req.body.title;
  const subject = req.body.subject;
  const author = req.body.author;
  const id = req.body.id;
  if(!id){
      const newPost = new Posts({
        title,
        subject,
        author
      });
      newPost.save()
        .then(result=>{
          res.send(result);
          console.log('saved');
        })
        .catch(err=>{
          return next(err);
        });
}
  else{
    Posts.findByIdAndUpdate(id, { $set: 
      { 'title' : title,
        'subject' : subject,
        'author' : author
      }
  })
  .then(result=>{
    res.send(result);
    console.log('updated');
  })
  .catch(err=>{
    return next(err);
  });
}
});

module.exports = router;