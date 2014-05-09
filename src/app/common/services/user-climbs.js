angular.module('rockstar.common.services.user-climbs', [
  'ngCookies'
])
  .service('userClimbs', function($http, $q){
    var userClimbs = this;

    userClimbs.create = function(data){
      return $http.post('/user-climbs', data)
    }

    userClimbs.show = function(id){
      return $http.get('/user-climb/'+id)
    }
  })
;
