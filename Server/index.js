
var express = require('express');
var config = require('./config/config');   

var app = express();    

require('./config/express')(app, config);
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports = app;
