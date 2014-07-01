angular.module('rockstar.dashboard-container', [
  'rockstar.dashboard',
  'rockstar.header',
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard-container', {
        //url: '/dashboard',
        templateUrl: 'dashboard/dashboard-container.tpl.html',
        controller: 'DashboardController',
        abstract: true
      })
    ;
  })

  .controller('DashboardController', function ($http) {
    
  })
;
