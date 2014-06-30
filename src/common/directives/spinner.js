angular.module('rockstar.common.directives.spinner', [
  'geolocation'
  ])
  .directive('spinner', function(){
    return {
      restrict: "A",
      templateUrl: 'common/directives/spinner.tpl.html',
      controller: "SpinnerController",
      link: function (scope, element, attrs) {

      }
    }
  })
  .controller('SpinnerController', function($scope, $element, geolocation){
    $scope.accuracy;
    $scope.show = true;
    geolocation.getAccuracy().then(function(accuracy){
      $scope.accuracy = accuracy;
    })

  });
