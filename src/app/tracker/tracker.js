angular.module('rockstar.tracker', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.climbs',
  'rockstar.common.services.attempt',
  'rockstar.common.directives.spinner'
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

  .controller('TrackerController', function ($scope, $http, userClimbs, climbs, Attempt) {
    $scope.climbs = [];
    $scope.selectedClimb;
    $scope.accurracy;
    $scope.attempt = new Attempt({
      climb: $scope.selectedClimb
    });

    climbs.index().then(function(climbs){
      $scope.climbs = climbs;
    });

    $scope.startClimb = function(){
      $scope.attempt.track();
    }

    $scope.getAccuracy = function(){
      $scope.attempt.getAccuracy().then(function(accuracy){
        console.log("Got accuracy of: "+accuracy.toString());
        $scope.accuracy = accuracy;
        setTimeout(function(){
          $scope.getAccuracy();
        }, 1000)
      })
    }

    $scope.stopClimb = function(){
      $scope.attempt.stop();
    }

    $scope.getAccuracy();
  })
;
