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
    var doThing = function(){
       console.log("woot")
      location.href = location.href; //try refreshing
      window.setTimeout(window.stop, 0);
      window.setTimeout(doThing, 1);
    }
    doThing()

  });
