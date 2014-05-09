var path = require('path');

module.exports = {
  port: 3444,
  rest_base_url: '/*',
  static_site_root: path.resolve(__dirname + '/../build'), //up a dir and find build
  db: 'mongodb://localhost/rockstar',
  dbName: "rockstar",
  facebook_app_id: "519333474845659",
  facebook_app_secret: "250aa81af804565c1e22e9c016af01cf",
  oauth_callback: "http://localhost:3444/auth/facebook/callback"


  //facebook_app_id: "660567470657558",
  //facebook_app_secret: "4cce5ca32d4a4e058589446b106715d7",
  //oauth_callback: "http://gregkerzhner.ngrok.com/auth/facebook/callback"
};