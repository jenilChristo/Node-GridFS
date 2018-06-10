var config = require('../config/config.js');

var uploadController = {

upload : function(req,res,next){
	console.log(req);    
	config.db.open(function(err, db) {
    // Our file ID
    var fileId = new ObjectID();

    // Open a new file
    var gridStore = new GridStore(db, fileId, 'w');

    // Read the filesize of file on disk (provide your own)
    var fileSize = fs.statSync(file).size;
    // Read the buffered data for comparision reasons
    var data = fs.readFileSync(file);

    // Open the new file
    gridStore.open(function(err, gridStore) {

        // Write the file to gridFS
        gridStore.writeFile(file, function(err, doc) {

            // Read back all the written content and verify the correctness
            GridStore.read(db, fileId, function(err, fileData) {
                console.log('Uploaded');
                assert.equal(data.toString('base64'), fileData.toString('base64'));

                //db.close();
            });
        });
    });
});

}

};
exports.uploadController = uploadController;