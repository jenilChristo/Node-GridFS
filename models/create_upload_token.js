var config = require('../config/config.js');
var Sequelize = config.Sequelize;
var sequelize = config.sequelize;

var filesmaster = sequelize.define('filesmaster', {
    FilesMasterId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    TenantId: {
        type: Sequelize.INTEGER,

        field: 'TenantId'
    },
    UploadToken: {
        type: Sequelize.STRING,
        field: 'UploadToken'
    },
    UploadedOn: {
        type: Sequelize.STRING,
        field: 'UploadOn'
    },
    UserIp: {
        type: Sequelize.STRING,
        field: 'UserIp'
    },
    BrowserInfo: {
        type: Sequelize.STRING,
        field: 'BrowserInfo'
    },
    FileType: {
        type: Sequelize.STRING,
        field: 'FileType'
    },
    FileName: {
        type: Sequelize.STRING,
        field: 'FileName'
    },
    UserId: {
        type: Sequelize.INTEGER,
        field: 'UserId'
    },
    UploadedOn: {
        type: Sequelize.DATE,
        field: 'UploadedOn',
        defaultValue: Sequelize.NOW
    },
    UploadStatus: {
        type: Sequelize.INTEGER,
        field: 'UploadStatus'
    },

}, {
    freezeTableName: true,
    timestamps: false,
    id: false // Model tableName will be the same as the model name
});

var uploadModel = {

    createUploadToken: function(req, res, data) {
        filesmaster.create(data).then(function(row) {

            res.json({
                upload_token: row.dataValues.UploadToken
            });
        }, function(err) {
            res.json({
                message: 'Could not create token'
            });
        });

    },
    getFiles: function(req, res, data) {
        filesmaster.findAll(data)
            .then(function(row) {
                console.log(data);
            }, function(err) {
                res.json({
                    message: 'Could not create token'
                });
            });

    }

};

exports.uploadModel = uploadModel;
exports.filesmaster = filesmaster;
