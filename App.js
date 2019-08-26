const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const {
    connect,
    connection
} = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.static(path.join(__dirname,'./public/index.html')));

/* app.use(express.static(path.join(__dirname,'/build'))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + 'build/index.html')) 
}) */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/' + process.env.NODE_ENV);

const {
    mongo
} = config;

connect(mongo.connectionString, mongo.connectOptions, (err)=>{
    if(err){
        return err;
    }
        console.log('db has been connected');
});

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

const router = require('./routes/index');
app.use(router);

/*app.listen(()=>{
    console.log('Started listening on port', config.port);
}); */

const httpServer = http.createServer(app);

httpServer.on('listening', () => console.log('Started listening on port', config.port));

httpServer.listen(config.port, config.host);