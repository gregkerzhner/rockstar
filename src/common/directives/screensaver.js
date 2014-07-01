angular.module('rockstar.common.directives.screensaver', [

  ])
  .directive('screensaver', function(){
    return {
      restrict: "A",
      controller: "ScreensaverController",
      templateUrl: 'common/directives/screensaver.tpl.html'
    }
  })
  .controller('ScreensaverController', function($scope, $element, geolocation){
    alert("hello from screensaver");

  });
