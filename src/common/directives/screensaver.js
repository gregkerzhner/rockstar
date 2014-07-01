angular.module('rockstar.common.directives.screensaver', [

  ])
  .directive('screensaver', function(){
    return {
      restrict: "A",
      controller: "ScreensaverController",
      templateUrl: 'common/directives/screensaver.tpl.html',
      scope: {
        state: '=state'
      }
    }
  })
  .controller('ScreensaverController', function($scope, $element, geolocation){
    $scope.setState = function(){
      if($scope.state === "recording"){
        document.getElementById('audio').play();
      }
    }
    $scope.$watch('state', $scope.setState);

  });
