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
        views: {
          'content':{
            templateUrl: 'tracker/tracker.tpl.html',
            controller: 'TrackerController'
          }
        }
      })
    ;
  })

  .controller('TrackerController', function ($scope, $state, $http, userClimbs, climbs, Attempt) {
    $scope.climbs = [];
    $scope.accurracy;
    $scope.state = "begin";

    $scope.attempt = new Attempt({
      climb: $scope.selectedClimb
    });

    $scope.showSpinner = false;

    climbs.index().then(function(climbs){
      $scope.climbs = climbs;
      $scope.attempt.climb = climbs[0]._id;
    });

    $scope.startClimb = function(){
      $scope.state = 'recording';
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
      $scope.state = 'recorded';
      $scope.attempt.stop();
    }

    $scope.saveClimb = function(){
      $scope.attempt.save().then(function(res){
        $state.go("rockstar.dashboard.attempt",
          {user_climb_id: res.data.userClimb,
           attempt_id: res.data._id
          }
        );
      })
    }

    $scope.getAccuracy();
  })
;
