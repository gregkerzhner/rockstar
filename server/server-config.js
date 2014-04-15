var path = require('path');

module.exports = {
  port: 3444,
  rest_base_url: '/*',
  static_site_root: path.resolve(__dirname + '/../build'), //up a dir and find build
  db: 'mongodb://localhost/rockstar',
  dbName: "rockstar",
  facebook_app_id: "519333474845659",
  facebook_app_secret: "",
  oauth_callback: ""
};