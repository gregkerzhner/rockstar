angular.module('rockstar.tracker', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.attempt'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.tracker', {
        url: '/tracker',
        templateUrl: 'tracker/tracker.tpl.html',
        controller: 'TrackerController'
      })
    ;
  })

  .controller('TrackerController', function ($scope, $http, userClimbs, Attempt) {
    $scope.climbs = [];
    $scope.selectedClimb;

    userClimbs.fetch().then(function(climbs){
      $scope.climbs = climbs;
    });

    $scope.startClimb = function(){
      $scope.attempt = new Attempt({
        climb: $scope.selectedClimb
      });
      $scope.attempt.track();
    }

    $scope.stopClimb = function(){
      $scope.attempt.stop();
    }
  })
;
