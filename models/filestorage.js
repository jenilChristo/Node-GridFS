var config = require('../config/config.js');
var Sequelize = config.Sequelize;
var sequelize = config.sequelize;
var filesmaster = require('./create_upload_token').filesmaster;
var filestorage = sequelize.define('filestorage', {
    FilesStorageId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    FilesMasterId: {
        type: Sequelize.INTEGER
    },
    StorageLocation: {
        type: Sequelize.STRING,
        field: 'UploadToken'
    }
}, {
    freezeTableName: true,
    timestamps: false,
    id: false // Model tableName will be the same as the model name
});
filestorage.belongsTo(filesmaster, {foreignKey: 'FilesMasterId'});
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

