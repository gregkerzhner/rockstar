var express = require('express');
var app = express(),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo')(express),
  server = require('http').createServer(app),
  userRoutes = require('./users'),
  config = require('./server-config'),
  passport = require("passport"),
  FacebookStrategy= require('passport-facebook').Strategy;

server.listen(config.port);
mongoose.connect(config.db);

var User = require("./schema").User

passport.serializeUser(function(user, done) {
  debugger
   done(null, {
      id: user["facebookId"],
      facebookId: user["facebookId"],
      displayName: user.displayName,
      email: user["email"],
      accessToken: user.accessToken
   });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var authenticatedOrNot = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    return res.send(401,"User Not Authenticated");
  }
}

passport.use(new FacebookStrategy({
    clientID: config.facebook_app_id,
    clientSecret: config.facebook_app_secret,
    callbackURL: config.oauth_callback,
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({ facebookId: profile.id }, function (err, user) {
      if(!user){
        var userData = new User({
            id: profile.id,
            facebookId: profile.id,
            created: Date.now(),
            accessToken: accessToken,
            displayName: profile.displayName
        });
        userData.save(function(err, user) {
          if (err) console.log(err);
          else {
          return done(err, user);
          }
        });
      }
      else{
        return done(err, user);
      }
    });
  }
));

app.configure(function(){ 
  app.use(express.static(config.static_site_root));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: "SECRET",
    store: new MongoStore({
      db: config.dbName
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/current-user', authenticatedOrNot, userRoutes.currentUser);
app.get('/user-climbs', authenticatedOrNot, userRoutes.climbs);

app.use(function(req, res) {
  res.sendfile(config.static_site_root+ '/index.html');
});
