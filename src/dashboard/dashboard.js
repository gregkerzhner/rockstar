angular.module('rockstar.dashboard', [
  'rockstar.dashboard.sidebar',
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard', {
        url: '/dashboard',
        views: {
          'content': {
            templateUrl: 'dashboard/dashboard.tpl.html',
            controller: "DashboardController"
          }
        }      
      })
    ;
  })
  .controller('DashboardController', function ($scope) {

  })
  

;
