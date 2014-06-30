angular.module('rockstar.common.services.attempts', [

])
  .service('attempts', function($http, $q){
    var attempts = this;

    attempts.index = function(userClimbId){
      return $http.get('/user-climb/'+userClimbId+'/attempts')
    }

    attempts.show = function(attemptId){
     return $http.get('/attempt/'+attemptId);
    }

  })
;
