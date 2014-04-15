angular.module('rockstar.common.services.current-user', [
  'ngCookies'
])
  .service('currentUser', function($http, $cookies){
    var currentUser = this;
    currentUser.facebookId = -1;
    currentUser.displayName = ""
    currentUser.accessToken = '';
    currentUser.loggedIn = false;

    currentUser.fetch = function(){
      return $http.get('/current-user').then(function(result){
        currentUser.displayName = result.data.displayName
        currentUser.loggedIn = true;
      })
    }
  })
;
