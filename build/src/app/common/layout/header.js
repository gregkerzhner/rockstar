angular.module('rockstar.header', [
  'ui.router',
  'rockstar.common.services.current-user'
])
  .controller('HeaderController', function HeaderController($scope, currentUser, $location) {
    $scope.showHeader = currentUser.loggedIn;
    debugger;
    $scope.currentUser = currentUser;
    currentUser.fetch();
  })
;
