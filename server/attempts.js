var schema = require("./schema");

exports.create = function(req, res){
  var Attempt = schema.Attempt;
  var UserClimb = schema.UserClimb;
  UserClimb.findOne({user: req.user._id, climb: req.body.climb}, function(err, userClimb){
    var attempt = new Attempt()
    attempt.userClimb = userClimb;
    attempt.coordinates = req.body.coordinates;
    attempt.save(function(err,attempt){
      res.send(201, attempt);
    })
  });
}

exports.get = function(req, res){
  var Attempt = schema.Attempt;
  debugger;
}

//tom roberts