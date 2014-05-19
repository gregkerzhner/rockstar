angular.module('rockstar.common.directives.3dplot', [])
  .directive('3dplot', function(){
    return {
      restrict: "A",
      scope: {
        attempt: "=attempt"
      },
      link: function (scope, element, attrs) {
        var attempt = scope.attempt;
      }
    }
  })
