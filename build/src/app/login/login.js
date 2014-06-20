angular.module('rockstar.login', ['ui.router']).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('rockstar.login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: 'LoginController'
    });
    ;
  }
]).controller('LoginController', [
  '$http',
  '$scope',
  '$rootScope',
  function LoginController($http, $scope, $rootScope) {
    $rootScope.login = true;
  }
]);
;