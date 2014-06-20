angular.module('rockstar.common.services.current-user', ['ngCookies']).service('currentUser', [
  '$http',
  '$cookies',
  function ($http, $cookies) {
    var currentUser = this;
    currentUser._id = -1;
    currentUser.displayName = '';
    currentUser.accessToken = '';
    currentUser.loggedIn = false;
    currentUser.facebookPicture = '';
    currentUser.fetch = function () {
      return $http.get('/current-user').then(function (result) {
        currentUser.displayName = result.data.displayName;
        currentUser._id = result.data._id;
        currentUser.loggedIn = true;
        currentUser.facebookPicture = result.data.facebookPicture;
      });
    };
  }
]);
;