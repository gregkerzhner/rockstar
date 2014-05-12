angular.module('rockstar.dashboard.attempt', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user',
  'rockstar.common.services.attempts'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard-container.dashboard.attempt', {
        url: '/user-climb/:user_climb_id/attempt/:attempt_id',
        views:{
          'content':{
            controller: 'AttemptController',
            templateUrl: 'dashboard/attempt.tpl.html'
          }   
        }

      })
    ;
  })
  .controller('AttemptController', function ($scope, $stateParams, userClimbs, attempts, currentUser) {
    $scope.userClimb;
    $scope.currentUser = currentUser;
    $scope.attempts;

    userClimbs.show($stateParams.user_climb_id).then(function(userClimb){
      $scope.userClimb = userClimb.data;
    })

    attempts.index($stateParams.user_climb_id).then(function(attempts){
      $scope.attempts = attempts.data;
    })
  })
;