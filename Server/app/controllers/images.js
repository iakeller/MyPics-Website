'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    mongoose = require('mongoose');
    var image = mongoose.model('MyImageModel');
      
var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/images').get(function(req, res, next){
		logger.log('Get all the images', 'verbose');
    });

var storage = multer.diskStorage({
	destination: function (req, file, cb) {      
	  	var path = config.uploads+ "/" + req.params.galleryId + "/";
		mkdirp(path, function(err) {
			if(err){
				res.status(500).json(err);
			} else {
				cb(null, path);
			}
		});
	},
	filename: function (req, file, cb) {
		let fileName = file.originalname.split('.');   
		cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
	}
  });

  //Create an Image - Working
 router.post('/images', function (req, res, next) {
        console.log('Create an image by post', 'verbose');
        var newImage = new image(req.body);
        newImage.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
           return next(err);
        });
      })
//get all Image - Working
router.get('/getImages', function (req, res, next) {
        console.log('Get ALL Images - New GET METHOD', 'verbose');
        var query = image.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No images available"});
          }
          })
          .catch(err => {
            return next(err);
          });
      });
//Get images by gallery id working - GetGalleryImages
      router.get('/images/gallery/:galleryId', function (req, res, next) {
        console.log('Get images by galleryId - New GET METHOD', 'verbose');
        console.log("-----------HERE------------"+req.params.galleryId);
        image.find({galleryId: req.params.galleryId})
                         .then(image => {
                             if(image){
                                 res.status(200).json(image);
                             } else {
                                 res.status(404).json({message: "No image found"});
                             }
                         })
                         .catch(error => {
                             return next(error);
                         });
        
      })

      //Update Image
router.put('/images/:imageId', requireAuth, function(req, res, next){
             console.log('Update Image', + req.params.imageId,  'verbose');
                 image.findOneAndUpdate({_id: req.params.imageId}, req.body, {new:true, multi:false})
                     .then(image => {
                         res.status(200).json(image);
                     })
                     .catch(error => {
                         return next(error);
                     });
             }); 

        //delete Image by imageId - working 
router.delete('/images/:imageId', function(req, res, next){
console.log('Delete image by imageId ' + req.params.imageId, 'verbose');
image.remove({ _id: req.params.imageId })
        .then(image => {
            res.status(200).json({msg: 'images for given user Deleted'});
        })
        .catch(error => {
            return next(error);
        });
});
/*
var upload = multer({ storage: storage });
router.post('/images/upload/:galleryId/:imageId', upload.any(), function(req, res, next){
    console.log('---------------------------- CALLING FILE UPLOAD API --------------------------');
console.log('Upload Image  ' + req.params.galleryId + ' and ' + req.params.imageId, 'verbose');

//console.log('Create an image by post', 'verbose');
//console.log(req.files[0].filename);
if(req.files){
    
var newImage = new image();
                //newImage.galleryId = galleryIdd;
                newImage.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }
        newImage.save()
        .then(result => {
            res.status(200).json(newImage);
        })
        .catch(err => {
           return next(err);
        });
});*/


var upload = multer({ storage: storage });
router.post('/images/upload/:galleryId/:imageId', upload.any(), function(req, res, next){
    logger.log('Upload file for ' + req.params.galleryId + ' and ' + req.params.imageId, 'verbose');
    
image.findById(req.params.imageId, function(err, image){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
image.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
image.save()
                .then(image => {
                    res.status(200).json(image);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});



};
