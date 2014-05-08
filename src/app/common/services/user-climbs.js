angular.module('rockstar.common.services.user-climbs', [
  'ngCookies'
])
  .service('userClimbs', function($http, $q){
    var userClimbs = this;
    userClimbs.climbs = [];

    userClimbs.fetch = function(){  
      var deferred = $q.defer();
      if(userClimbs.climbs.length > 0) {
        deferred.resolve(userClimbs.climbs);
      }
      else{
        $http.get('/user-climbs').then(function(result){
          userClimbs.climbs = [];
          for(var i = 0; i<result.data.climbs.length; i++){
            userClimbs.climbs.push(result.data.climbs[i]);
          }
          deferred.resolve(userClimbs.climbs);
        })
      }
      return deferred.promise;
    }

    userClimbs.create = function(data){
      return $http.post('/user-climbs', data)
    }

  })
;
