angular.module('rockstar.tracker', [
  'ui.router',
  'rockstar.dashboard.header'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('tracker', {
        url: '/tracker',
        views: {
          '': {
            templateUrl: 'tracker/tracker.tpl.html',
            controller: 'TrackerController'
          }
        }
      })
    ;
  })

  .controller('TrackerController', function ($http) {

  })
;
