angular.module('rockstar.dashboard.header', [
  'ui.router',
  'rockstar.common.services.current-user'
])
  .controller('HeaderController', function HeaderController($scope, currentUser) {
    $scope.currentUser = currentUser;
    currentUser.fetch();
  })
;
