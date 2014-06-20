angular.module('rockstar.dashboard.sidebar', [
  'ui.router',
  'rockstar.common.services.current-user'
]).controller('SidebarController', [
  '$scope',
  'userClimbs',
  function SidebarController($scope, userClimbs) {
  }
]);
;