var schema = require("./schema")

exports.currentUser= function(req, res){
  res.json(req.user)
}

exports.climbs = function(req, res){
  var UserClimb = schema.UserClimb;
  var Climb = schema.Climb;
  UserClimb.find({user: req.user._id}).populate("climb").exec(function(err, userClimbs){
    var climbs = []
    for(var i = 0; i<userClimbs.length; i++){
      climbs.push(userClimbs[i].climb);
    }
    res.json({climbs: climbs})
  });
}