angular.module('rockstar.dashboard.sidebar', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.current-user'
])
  .controller('SidebarController', function SidebarController($scope, userClimbs, currentUser) {
    $scope.climbs = userClimbs.climbs;
    $scope.currentUser = currentUser
    userClimbs.fetch()
  })
;
