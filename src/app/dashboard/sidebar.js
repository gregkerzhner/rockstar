angular.module('rockstar.dashboard.sidebar', [
  'ui.router',
  'rockstar.common.services.user-climbs'
])
  .controller('SidebarController', function SidebarController(userClimbs) {
    userClimbs.fetch()
  })
;
