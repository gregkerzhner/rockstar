angular.module('rockstar.dashboard.user-climbs', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard-container.dashboard.user-climbs', {
        url: '/user-climbs',
        views:{
          'content':{
            controller: 'UserClimbsController',
            templateUrl: 'dashboard/user-climbs.tpl.html'
          }   
        }

      })
    ;
  })
  .controller('UserClimbsController', function ($scope, userClimbs, currentUser) {
    $scope.climbs = []
    $scope.currentUser = currentUser
    userClimbs.index().then(function(userClimbs){
      $scope.userClimbs = userClimbs.data;
    })
  })
;