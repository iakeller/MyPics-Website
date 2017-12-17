var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var GalleryModel = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    gallery: { type: String, required: true },
    description: { type: String },
    file: {fileName: String,
           originalName: String,
           
          }
});

module.exports = Mongoose.model('MyGalleryModel', GalleryModel);
