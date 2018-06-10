var config = require('./config/config.js'),
    routes = require('./routes'),
    express = require('express'),
    app = express(),
    multiparty = require('connect-multiparty')();
    bodyParser = require('body-parser');
    http = require('http');
var Grid = require('gridfs-stream');
var mongo = require('mongodb');

app.set('port', config.port);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Api-Key,user_agent,X-Requested-With, Content-Type, Accept");
    next();});
app.use('/views',express.static(__dirname+'/views'));
app.get('/',function(req,res){
res.sendFile(__dirname+'/views/index.html');
});
app.post('/upload',multiparty,routes.uploadController.upload);
app.post('/create_upload_token',multiparty,routes.uploadController.create_upload_token);
app.post('/uploaded',routes.uploadController.uploaded_list);
server = http.createServer(app);
var boot = function() {
    server.listen(app.get('port'), function() {
        console.info('Express server listening on port', app.get('port'));
    });
};

if(config.boot){
boot();
}