angular.module('rockstar.common.services.areas', [
  'ngCookies'
])
  .service('areas', function($http, $q){
    var areas = this;

    areas.show = function(areaId){
     return $http.get('/area/'+areaId);
    }

  })
;