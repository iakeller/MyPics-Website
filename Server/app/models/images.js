var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ImageModel = new Schema({
    galleryId: { type: Schema.Types.ObjectId},
    file: {fileName: String,
           originalName: String,
           dateUploaded : Date
          }
    
});

module.exports = Mongoose.model('MyImageModel', ImageModel);
