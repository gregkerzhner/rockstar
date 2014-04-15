var schema = require("./schema")

exports.currentUser= function(req, res){
  res.json(req.user)
}

exports.climbs = function(req, res){
  var UserClimb = schema.UserClimb;
  UserClimb.find({user: req.user.id}, function(err, climbs){
    debugger
    res.json({ok: true})
  });
}