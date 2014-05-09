var schema = require("./schema");
var Climb = schema.Climb;
var UserClimb = schema.UserClimb;

exports.create = function(req, res){  
  var climb = new Climb(req.body);
  climb.save(function(err, climb){
    res.send(201, climb)
  })
}

exports.index = function(req, res){  
  UserClimb.find({user: req.user._id}).populate("climb").exec(function(err, userClimbs){
    var climbs = []
    for(var i = 0; i<userClimbs.length; i++){
      climbs.push(userClimbs[i].climb);
    }
    res.json({climbs: climbs})
  });
}