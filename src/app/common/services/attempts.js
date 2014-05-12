angular.module('rockstar.common.services.attempts', [
  'ngCookies'
])
  .service('attempts', function($http, $q){
    var attempts = this;

    attempts.index = function(userClimbId){
      return $http.get('/user-climb/'+userClimbId+'/attempts')
    }

  })
;
