angular.module('rockstar.header', [
  'ui.router',
  'rockstar.common.services.current-user'
])
  .controller('HeaderController', function HeaderController($scope, currentUser, $location) {
    $scope.currentUser = currentUser;
    $scope.showHeader = $location.$$path.indexOf("/login") < 0
    currentUser.fetch();
  })
;
