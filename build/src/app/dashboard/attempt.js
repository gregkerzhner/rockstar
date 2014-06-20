angular.module('rockstar.dashboard.attempt', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user',
  'rockstar.common.services.attempts',
  'rockstar.common.directives.linegraph'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('rockstar.dashboard-container.dashboard.attempt', {
      url: '/user-climb/:user_climb_id/attempt/:attempt_id',
      views: {
        'content': {
          controller: 'AttemptController',
          templateUrl: 'dashboard/attempt.tpl.html'
        }
      }
    });
    ;
  }
]).controller('AttemptController', [
  '$scope',
  '$stateParams',
  'userClimbs',
  'attempts',
  'currentUser',
  function ($scope, $stateParams, userClimbs, attempts, currentUser) {
    $scope.currentUser = currentUser;
    $scope.attempt;
    attempts.show($stateParams.attempt_id).then(function (data) {
      $scope.attempt = data.data;
      $scope.coordinates = $scope.attempt.coordinates;
      $scope.climbDuration = (Date.parse($scope.attempt.endTime) - Date.parse($scope.attempt.startTime)) / 1000;
    });
  }
]);
;