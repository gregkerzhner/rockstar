angular.module('rockstar.dashboard.sidebar', [
  'ui.router',
  'rockstar.common.services.current-user'
])
  .controller('SidebarController', function SidebarController($scope, userClimbs) {
    alert("loading")
  })
;
