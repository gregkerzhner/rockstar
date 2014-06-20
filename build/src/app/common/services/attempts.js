angular.module('rockstar.common.services.attempts', ['ngCookies']).service('attempts', [
  '$http',
  '$q',
  function ($http, $q) {
    var attempts = this;
    attempts.index = function (userClimbId) {
      return $http.get('/user-climb/' + userClimbId + '/attempts');
    };
    attempts.show = function (attemptId) {
      return $http.get('/attempt/' + attemptId);
    };
  }
]);
;