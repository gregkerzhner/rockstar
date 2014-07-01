angular.module('rockstar.dashboard.user-climbs', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user',
  'rockstar.common.services.climbs',
  'rockstar.common.services.areas',
  'rockstar.common.directives.sort'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('rockstar.dashboard.user-climbs', {
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
  .controller('UserClimbsController', function ($scope, userClimbs, currentUser, areas) {
    $scope.climbs = [];
    $scope.currentUser = currentUser;
    $scope.predicate = 'name';
    $scope.reverse = false;
    $scope.fetchAreas = function(){
      for(var i = 0; i<$scope.userClimbs.length; i++){
        $scope.setArea(i)
      }
    }

    $scope.setArea = function(userClimbIndex){
      var userClimb = $scope.userClimbs[userClimbIndex];
      areas.show(userClimb.climb.area).then(function(area){
        $scope.userClimbs[userClimbIndex].area = area.data;
      })
    }

    userClimbs.index().then(function(userClimbs){
      $scope.userClimbs = userClimbs.data;
      $scope.fetchAreas();
    })
  })
;