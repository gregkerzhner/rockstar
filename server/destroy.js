var express = require('express');
var app = express(),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo')(express),
  server = require('http').createServer(app),
  userRoutes = require('./users'),
  config = require('./server-config'),
  schema = require("./schema"),
  events = require('events');

var eventEmitter = new events.EventEmitter();



mongoose.connect(config.db);


var User = schema.User;
var Area = schema.Area;
var Climb = schema.Climb;
var UserClimb = schema.UserClimb;
var Attempt= schema.Attempt;

User.find().remove(function(){
  Area.find().remove(function(){
  console.log("remove done")
  Climb.find().remove(function(){
    UserClimb.find().remove(function(){
      Attempt.find().remove(function(){
        console.log("destroy done")
        eventEmitter.emit("done")
      })
    })
  })
  })
})

eventEmitter.on('done', function(){
  process.kill()
})