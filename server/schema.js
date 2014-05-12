var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;


var UserSchema = mongoose.Schema({
  id: String,
  facebookId: String,
  accessToken: String,
  displayName: String,
  facebookPicture: String
})

var User = mongoose.model('User', UserSchema)

var AreaSchema = mongoose.Schema({
  name: String  
})

var Area = mongoose.model('Area', AreaSchema)

var ClimbSchema = mongoose.Schema({
  name: String,
  area: {type : mongoose.Schema.ObjectId, ref : 'Area'}
})

var Climb = mongoose.model('Climb', ClimbSchema)

var UserClimbSchema = mongoose.Schema({
  user: {type : mongoose.Schema.ObjectId, ref : 'User'},
  climb: {type : mongoose.Schema.ObjectId, ref : 'Climb'},
  attempts: [{type : mongoose.Schema.ObjectId, ref : 'Attempt'}]
})


var AttemptSchema = mongoose.Schema({
  userClimb: {type : mongoose.Schema.ObjectId, ref : 'UserClimb'},
  name: String,
  coordinates: [],
})



var Attempt = mongoose.model('Attempt', AttemptSchema)

var UserClimb = mongoose.model('UserClimb', UserClimbSchema)


module.exports = {
  User: User,
  Area: Area,
  Climb: Climb,
  UserClimb: UserClimb,
  Attempt: Attempt
}