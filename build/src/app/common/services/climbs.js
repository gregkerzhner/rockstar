angular.module('rockstar.common.services.climbs', ['ngCookies']).service('climbs', [
  '$http',
  '$q',
  function ($http, $q) {
    var climbs = this;
    climbs.create = function (data) {
      return $http.post('/climbs', data);
    };
    climbs.index = function () {
      var deferred = $q.defer();
      $http.get('/climbs').then(function (result) {
        climbs.climbs = [];
        for (var i = 0; i < result.data.climbs.length; i++) {
          climbs.climbs.push(result.data.climbs[i]);
        }
        deferred.resolve(climbs.climbs);
      });
      return deferred.promise;
    };
    climbs.show = function (climbId) {
      return $http.get('/climb/' + climbId);
    };
  }
]);
;