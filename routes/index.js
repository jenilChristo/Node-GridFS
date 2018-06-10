var config = require('../config/config.js'),
    mongo = require('mongodb');
grid = require('gridfs-stream');
fs = require('fs');
var gfs = grid(config.db, mongo);
var uploadedData ='';
var Hashids = require('hashids');
var uploadModel = require('../models/create_upload_token.js').uploadModel; 
var uploadController = {
    create_upload_token :function(req, res, next){

        //get request details
        var browser = req.headers['user-agent'];
        var file_type = req.files.file.type;
        var file_name = req.files.file.name;console.log(file_name);
        var user_ip = req.connection.remoteAddress;
        var upload_date = (new Date()).valueOf().toString();    

        //generate a hash key
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var upload_token = new Hashids(current_date+random);

        var create_token = uploadModel.createUploadToken(req ,res,{TenantId:'1',
                                        UploadToken:upload_token.alphabet,
                                        UploadOn:current_date,
                                        UserIp:user_ip,
                                        BrowserInfo:browser,
                                        FileType:file_type,
                                        UploadStatus:'0',
                                        UserId:config.UserId,
                                        FileName:file_name});
 
    },
    uploaded_list : function(req,res,next){

        var getUploadedFiles = listModel.getFiles(req ,res,{FileType:req.query.type});
    },
    upload: function(req, res, next) {
        var upload_token = req.query.token;
        console.log(req.files);
        res.setTimeout(0);
        var temp_file = req.files.file.path;
        console.log(req.files.file);
        if(upload_token){
        config.db.open(function(err) {

            if (err) return handleError(err);

            var writestream = gfs.createWriteStream({
                filename: req.files.file.name,
                mode: 'w',
                content_type: req.files.file.type
            });
        var readableStream =   fs.createReadStream(temp_file)
                .on('end', function() {
                    res.send('OK');
                })
                .on('error', function() {
                    res.send('ERR');
                })
                .pipe(writestream);
                readableStream.on('data',function(dataUploaded){
                    // uploadedData+=dataUploaded;
                    console.log('data chunks');
                });
                // .on('end',function(uploadedFile){
                //     res.end(uploadedFile+" uploaded");
                //     config.db.close();
                // })
        });
            }
            else{
                res.json({status:false,message:"Invalid Upload token.Upload failed"});
            }
    }
};

exports.uploadController = uploadController;