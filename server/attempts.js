var schema = require("./schema");
var UserClimb = schema.UserClimb;
var Climb = schema.Climb;
var Attempt = schema.Attempt;

exports.create = function(req, res){
  var Attempt = schema.Attempt;
  var UserClimb = schema.UserClimb;
  UserClimb.findOne({user: req.user._id, climb: req.body.climb}, function(err, userClimb){
    Attempt.findOne({userClimb: userClimb._id}, function(err, attempt){
      var number = (attempt && attempt.number) ? attempt.number + 1 : 1;
      var attempt = new Attempt()
      attempt.userClimb = userClimb;
      attempt.coordinates = req.body.coordinates;
      attempt.startTime = req.body.startTime;
      attempt.endTime = req.body.endTime;
      attempt.notes = req.body.notes;
      attempt.number = number;
      attempt.save(function(err, attempt){
        res.send(201, attempt);
      })
    })
  });
}

exports.index = function(req, res){
  Attempt.find({userClimb: req.params["user_climb_id"]}, function(err, attempts){
    res.json(attempts)
  });
}

exports.show = function(req, res){
  Attempt.findById(req.params["id"], function(err, attempt){
    res.json(attempt)
  });
}

