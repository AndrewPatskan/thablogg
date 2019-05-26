const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const user = require('./user');
const posts = require('./posts');
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 7777;

app.use(express.static(path.join(__dirname,'/public/index.html')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'my-secret', saveUninitialized: true, resave: true}));

const allowCrossDomain = function (req, res, next) {
    const browser = req.headers['user-agent'];

    if (/Trident|Edge/.test(browser)) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'credentials, Remote Address, Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Content-Disposition, Content-Transfer-Encoding, Content-Length');

    if (req.method === 'OPTIONS') {
        return res.status(200).send({});
    }

    next();
};
app.use(allowCrossDomain);


app.post('/', function (req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const login = req.body.login;
    const password = req.body.password;
 
  if(firstname && lastname && login && password){
      user.signup(firstname, lastname, login, password);
      //no safety
      res.send('success');
  }
  else{
    const err = new Error('wrong data');
    return next(err);
  }
  });

app.post('/signin', function (req, res, next) {
    const sessions=req.session;
    const login = req.body.login;
    const password = req.body.password;
        user.signin(login, password, function(result){
        if(result){
            sessions.login = login;
            res.send('success');
          }
          else{
            const err = new Error('wrong data');
            return next(err);
          }
    });
    
  });
  
app.post('/addpost', function (req, res) {
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
    }); 
  }
});

app.post('/posts', function (req, res,next) {
    posts.showpost(function(result){
      res.send(result);
    });
  });

app.post('/deletepost', function(req,res){
    const id = req.body.id;
    posts.deletepost(id, function(result){
      res.send(result);
    })
  });

app.post('/getpostwithid', function(req,res){
    const id = req.body.id;
    posts.getPostWithId(id, function(result){
      res.send(result);
    })
  });

const httpServer = http.createServer(app);

httpServer.on('listening', () =>  console.log('Started listening on port', PORT));

httpServer.listen(PORT, 'localhost');