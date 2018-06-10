var port = 3000;
var boot = true;
var tenant_id = 1;
var user_id = 1;
var Server = require('mongodb').Server;
var mongo = require('mongodb').Db;
var db = new mongo('uploads', new Server('localhost', 27017));

var Sequelize = require('sequelize');
var sequelize = new Sequelize('file-upload', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = {
	db:db,
	port:port,
	boot:boot,
	mongo:mongo,
	tenant_id:tenant_id,
	sequelize:sequelize,
	Sequelize:Sequelize,
	user_id:user_id
};