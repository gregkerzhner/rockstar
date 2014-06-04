var schema = require("./schema");
var Area = schema.Area;

exports.show = function(req, res){
  Area.findById(req.params["id"]).exec(function(err, area){
    res.json(area)
  });
}

