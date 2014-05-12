var schema = require("./schema");
var UserClimb = schema.UserClimb;
var Climb = schema.Climb;

exports.index = function(req, res){  
  UserClimb.find({user: req.user._id}).populate("climb").exec(function(err, userClimbs){
    res.json(userClimbs)
  });
}


exports.create = function(req, res){
  var userClimb = new UserClimb({user: req.user._id, climb: req.body.climb})
  userClimb.save(function(err, userClimb){
    res.send(201, userClimb);
  })
}

exports.show = function(req, res){
  UserClimb.findById(req.params["id"]).populate("climb").populate('attempts').exec(function(err, userClimb){
    res.json(userClimb)
  });
}
