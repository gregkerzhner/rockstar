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
        eventEmitter.emit("destroy:done")
      })
    })
  })
  })
})


var user;
console.log("seeding")
eventEmitter.on('destroy:done', function(){
  User.findOne({},function(err, u){
    if(u){
      user = u;
      eventEmitter.emit("user:found");
      console.log("User: "+user._id);
    }
    else{
      new User({
        "_id": "53923980c95432f00e0980a4",
        "id": "618758715",
        "facebookId": "618758715",
        "accessToken": "CAAHYVL9Jw9sBABswYaj3vCkB8TQNvlGfGAvgTQJ2j4D79aiptlMKmQ2ZAaVgY84TvhTS1dxLWECN0rokVU7rKjP0Ts6FVO19hfDIMfittqvCZCgH4fcV8m1ASZAHpbZACFnUFFdO0mkvCpc7SCmikoJDM7BVPNpljnJeAZAXGvrfK1OsSBwL4rCnl6Wn079IZD",
        "displayName": "Greg Kerzhner",
        "facebookPicture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/p50x50/1011641_10151629271898716_1413603497_n.jpg"
      }).save(function(err, us){
        user = us;
        console.log("User: "+user._id);
        eventEmitter.emit("user:found");
      })
    }
  })
});

eventEmitter.on('user:found', function(){
  new Area({
    name: "Choss River Gorge"
  }).save(function(err, area){
    console.log("Area: "+area.id);
    new Climb({
      name: "50 Words For Choss",
      area: area._id
    }).save(function(err, climb){
      console.log("Climb: "+climb.id);
      new UserClimb({
        user: user._id,
        climb: climb._id
      }).save(function(err, userClimb){
        if(err) console.log(err);
        console.log("UserClimb: "+ userClimb._id);
        new Attempt({
          userClimb: userClimb._id,
          "endTime": "2014-06-06T21:35:25.641Z",
          "startTime": "2014-06-06T21:35:19.708Z",
          "coordinates": [
            {
              "speed": 0.36000001430511475,
              "accuracy": 10,
              "altitudeAccuracy": 4,
              "altitude": 1883.0052070617676,
              "longitude": -107.21177631999106,
              "heading": 334.3359375,
              "latitude": 39.40076337199602,
              "time": 1402090519764
            },
            {
              "speed": 0.4300000071525574,
              "accuracy": 10,
              "altitudeAccuracy": 4,
              "altitude": 1882.6814765930176,
              "longitude": -107.2117917426929,
              "heading": 334.3359375,
              "latitude": 39.400759600139594,
              "time": 1402090520780
            },
            {
              "speed": 0.5600000023841858,
              "accuracy": 10,
              "altitudeAccuracy": 3,
              "altitude": 1883.5440254211426,
              "longitude": -107.21181403855533,
              "heading": 334.3359375,
              "latitude": 39.400759181044435,
              "time": 1402090521792
            },
            {
              "speed": 1,
              "accuracy": 10,
              "altitudeAccuracy": 3,
              "altitude": 1883.7190742492676,
              "longitude": -107.2118348256752,
              "heading": 254.8828125,
              "latitude": 39.40075561873559,
              "time": 1402090522804
            },
            {
              "speed": 0.7200000286102295,
              "accuracy": 10,
              "altitudeAccuracy": 4,
              "altitude": 1883.3357734680176,
              "longitude": -107.21184790144414,
              "heading": 254.8828125,
              "latitude": 39.400755325368976,
              "time": 1402090523817
            },
            {
              "speed": 0.5400000214576721,
              "accuracy": 10,
              "altitudeAccuracy": 4,
              "altitude": 1883.5325508117676,
              "longitude": -107.21185854646117,
              "heading": 254.8828125,
              "latitude": 39.40075478054527,
              "time": 1402090524837
            }
          ]
        }).save(function(err, attempt){
          console.log("Attempt: "+attempt._id)
          console.log("Made attempt with userclimb "+attempt.userClimb)
          eventEmitter.emit("done")
        })          
      })
    })
  })
})


eventEmitter.on('done', function(){
  process.kill()
})
