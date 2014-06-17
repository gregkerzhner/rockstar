angular.module('rockstar.dashboard', [
  'rockstar.dashboard.sidebar',
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard-container.dashboard', {
        url: '',
        views: {
          'sidebar':{
            templateUrl: 'common/layout/sidebar.tpl.html',
            controller: 'SidebarController'
          },
          '':{
            template: '<div ui-view="content"></div>'
          }
        }        
      })
    ;
  })

;
