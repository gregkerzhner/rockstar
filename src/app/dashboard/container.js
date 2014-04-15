angular.module('rockstar.dashboard.container', [
  'ui.router',
  'rockstar.dashboard.header',
  'rockstar.dashboard.sidebar'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.home', {
        url: '',
        views: {
          'header@dashboard':{
            templateUrl: 'dashboard/header.tpl.html',
            controller: 'HeaderController'
          },
          'sidebar@dashboard':{
            templateUrl: 'dashboard/sidebar.tpl.html',
            controller: 'SidebarController'
          },
        }
      })
    ;
  })
;
