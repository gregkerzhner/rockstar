angular.module('rockstar.common.services.user-climbs', [
  'ngCookies'
])
  .service('userClimbs', function($http){
    var userClimbs = this;
    userClimbs.climbs = [];
    userClimbs.fetch = function(){
      return $http.get('/user-climbs').then(function(result){
        debugger;
      })
    }
  })
;
