'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    mongoose = require('mongoose');
    var user = mongoose.model('MyUserModel');
    

      
var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/users').get(function(req, res, next){
		logger.log('Get all users', 'verbose');
    });

 router.put('/users/password/:userId', requireAuth, function(req, res, next){
           logger.log('Update user ' + req.params.userId, 'verbose');
            user.findById(req.params.userId)
            .exec()
            .then(function (user) {
             if (req.body.password !== undefined) {
                  user.password = req.body.password;
                  }
                    user.save()
                        .then(function (user) {
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                })
                .catch(function (err) {
                    return next(err);
                });
        });


 router.post('/users', function (req, res, next) {
        console.log('Create User by post', 'verbose');
        var newuser = new user(req.body);
        newuser.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
           return next(err);
        });
      })
//get all users - Working
router.get('/getusers', function (req, res, next) {
        console.log('Get Users - New GET METHOD', 'verbose');
        var query = user.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No Users"});
          }
          })
          .catch(err => {
            return next(err);
          });
      });
//Get user by id working
      router.get('/users/:userId', function (req, res, next) {
        console.log('Get Users - New GET METHOD', 'verbose');
        console.log("-----------HERE------------"+req.params.userId);
        user.findById(req.params.userId)
                         .then(user => {
                             if(user){
                                 res.status(200).json(user);
                             } else {
                                 res.status(404).json({message: "No user found"});
                             }
                         })
                         .catch(error => {
                             return next(error);
                         });
        
      })

router.put('/users/:userId', requireAuth, function(req, res, next){
             logger.log('Update user', + req.params.userId,  'verbose');
                 user.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true, multi:false})
                     .then(user => {
                         res.status(200).json(user);
                     })
                     .catch(error => {
                         return next(error);
                     });
             }); 

        //delete user - working 
router.delete('/users/:userId', function(req, res, next){
    logger.log('Delete user ' + req.params.userId, 'verbose');
   user.remove({ _id: req.params.userId })
        .then(user => {
            res.status(200).json({msg: 'User Deleted'});
        })
        .catch(error => {
            return next(error);
        });
});

router.route('/users/login').post(requireLogin, login);
         
router.post('/login', requireAuth, function(req, res, next){
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    var obj = {'email' : email, 'password' : password};
    res.status(201).json(obj);
});

};
