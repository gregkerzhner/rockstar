angular.module('rockstar.common.directives.sort', []).directive("sort", function() {
return {
    restrict: 'A',
    transclude: true,
    template : 
      '<a href="" ng-click="onClick()">'+
        '<span ng-transclude></span>'+ 
      '</a>',
    scope: {
      order: '=',
      by: '=',
      reverse : '='
    },
    link: function(scope, element, attrs) {
      scope.onClick = function () {
        if( scope.order === scope.by ) {
           scope.reverse = !scope.reverse 
        } else {
          scope.by = scope.order ;
          scope.reverse = false; 
        }
      }
    }
}
});