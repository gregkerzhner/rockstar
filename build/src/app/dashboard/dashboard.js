angular.module('rockstar.dashboard', [
  'rockstar.dashboard.sidebar',
  'ui.router'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('rockstar.dashboard-container.dashboard', {
      url: '',
      views: {
        'header': {
          templateUrl: 'common/layout/header.tpl.html',
          controller: 'HeaderController'
        },
        'sidebar': {
          templateUrl: 'common/layout/sidebar.tpl.html',
          controller: 'SidebarController'
        },
        '': { template: '<div ui-view="content"></div>' }
      }
    });
    ;
  }
]);
;