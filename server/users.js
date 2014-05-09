var schema = require("./schema")

exports.currentUser= function(req, res){
  res.json(req.user)
}
