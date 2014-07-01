angular.module('rockstar.dashboard.user-climb', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user',
  'rockstar.common.services.attempts'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard.user-climb', {
        url: '/user-climb/:user_climb_id',
        views:{
          'content':{
            controller: 'UserClimbController',
            templateUrl: 'dashboard/user-climb.tpl.html'
          }   
        }

      })
    ;
  })
  .controller('UserClimbController', function ($scope, $stateParams, userClimbs, attempts, currentUser) {
    $scope.userClimb;
    $scope.currentUser = currentUser;
    $scope.attempts;
    $scope.userClimbId = $stateParams.user_climb_id;
    userClimbs.show($stateParams.user_climb_id).then(function(userClimb){
      $scope.userClimb = userClimb.data;
    })

    attempts.index($stateParams.user_climb_id).then(function(attempts){
      $scope.attempts = attempts.data;
      for(var i = 0; i<$scope.attempts.length ; i++){
        $scope.attempts[i].date = 
          new Date($scope.attempts[i].startTime).toDateString() +
          " " +
          new Date($scope.attempts[i].startTime).getHours() + 
          ":" + 
          new Date($scope.attempts[i].startTime).getMinutes();

        $scope.attempts[i].duration = (Date.parse($scope.attempts[i].endTime) - Date.parse($scope.attempts[i].startTime) )/1000;

      }
    })
  })
;