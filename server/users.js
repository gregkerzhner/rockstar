var schema = require("./schema")
var User = schema.User;

exports.currentUser= function(req, res){
  res.json(req.user)
}


exports.index= function(req, res){
  User.find().exec(function(err, users){
    res.json(users);
  });

}
