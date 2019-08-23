const Posts = require('../models/posts');
const error = require('../helpers/error');

module.exports = {
    addPost: async (req, res, next) => {
      try{

        const { title, subject, author, id } = req.body;
        if(!subject && !author){
          throw error.notEnoughtParams();
        }

        if(!id){
          const newPost = new Posts({
                title,
                subject,
                author
              });

          const result = await newPost.save();

          if(!result){
            throw error.serverError();
          }
          res.send('saved');
          console.log('saved');
        }
        else {
          const result = await Posts.findByIdAndUpdate(id, { $set: 
              { 'title' : title,
                'subject' : subject,
                'author' : author
              }
        });

        if(!result){
          throw error.notFound();
        }
        res.send('updated');
        console.log('updated');
      }
      } catch(err){
          next(err);
      };
    },
    
    deletePost: async (req, res, next) => {
      try{
        const { id } = req.body;
        if(!id){
          throw error.notEnoughtParams();
        }
        const result = await Posts.findByIdAndRemove(id);
        if(!result){
          throw error.notFound();
        }
        res.send('deleted');
        console.log('deleted');
      } catch(err){
          next(err);
      };
    },
    
    showAll: async (req, res, next) => {
      try{
        const result = await Posts.find();
        if(!result){
          throw error.notFound();
        }
        res.send(result);
      } catch(err){
          next(err);
      };
    },
    
    getPost: async (req, res, next) => {
      try{
        const { id } = req.body;

        const result = await Posts.findById(id);
        if(!result){
          throw error.notFound();
        }
        res.send(result);
      } catch(err){
          next(err);
      };
    }
}