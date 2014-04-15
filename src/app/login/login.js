angular.module('rockstar.login', [
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.tpl.html',
        controller: 'LoginController'
      })
    ;
  })

  .controller('LoginController', function LoginController($http) {

  })
;
