angular.module('rockstar.login', [
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.login', {
        url: '/login',
        templateUrl: 'login/login.tpl.html',
        controller: 'LoginController'
      })
    ;
  })

  .controller('LoginController', function LoginController($http, $scope, $rootScope) {
    $rootScope.login = true;
  })
;
