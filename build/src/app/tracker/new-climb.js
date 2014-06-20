angular.module('rockstar.new-climb', [
  'ui.router',
  'rockstar.common.services.user-climbs',
  'rockstar.common.services.climbs'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('rockstar.new-climb', {
      url: '/new-climb',
      templateUrl: 'tracker/new-climb.tpl.html',
      controller: 'NewClimbController'
    });
    ;
  }
]).controller('NewClimbController', [
  '$scope',
  '$state',
  '$http',
  'userClimbs',
  'climbs',
  function ($scope, $state, $http, userClimbs, climbs) {
    $scope.name = '';
    $scope.submit = function () {
      climbs.create({ name: $scope.name }).then(function (data) {
        userClimbs.create({ climb: data.data._id }).then(function (data) {
          //empty user climbs so it gets refetched
          userClimbs.climbs = [];
          $state.go('rockstar.tracker');
        });
      });
    };
  }
]);
;