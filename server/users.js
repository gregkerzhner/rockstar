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

exports.newClimb = function(req, res){
  var Climb = schema.Climb;
  var climb = new Climb(req.body);
  climb.save(function(err, climb){
    res.send(201, climb)
  })
}

exports.newUserClimb = function(req, res){
  var UserClimb = schema.UserClimb;
  var userClimb = new UserClimb({user: req.user._id, climb: req.body.climb})
  userClimb.save(function(err, userClimb){
    res.send(201, userClimb);
  })

}