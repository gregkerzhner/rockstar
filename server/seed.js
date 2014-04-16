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

Area.find().remove(function(){
  console.log("remove done")
  Climb.find().remove(function(){
    UserClimb.find().remove(function(){
      console.log("destroy done")
      eventEmitter.emit("destroy:done")
    })
  })
})


eventEmitter.on('destroy:done', function(){
  console.log("seeding")
  User.findOne({},function(err, user){
    new Area({
      name: "Choss River Gorge"
    }).save(function(err, area){
      new Climb({
        name: "50 Words For Choss",
        area: area._id
      }).save(function(err, climb){
        new UserClimb({
          user: user._id,
          climb: climb._id
        }).save(function(err, userClimb){
          eventEmitter.emit("done")
        })
      })
    })
  })
});

eventEmitter.on('done', function(){
  process.kill()
})
