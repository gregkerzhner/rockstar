angular.module('rockstar.dashboard.climbs', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.climbs', {
        url: '/climbs',
        views:{
          'content@dashboard':{
            controller: 'ClimbsController',
            templateUrl: 'dashboard/climbs.tpl.html'
          }   
        }

      })
    ;
  })
  .controller('ClimbsController', function ($scope, userClimbs, currentUser) {
    $scope.climbs = userClimbs.climbs;
    $scope.currentUser = currentUser
    userClimbs.fetch()
  })
;