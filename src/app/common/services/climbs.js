angular.module('rockstar.common.services.climbs', [
  'ngCookies'
])
  .service('climbs', function($http, $q){
    var climbs = this;

    climbs.create = function(data){
      return $http.post('/climbs', data);
    }

  })
;
