angular.module('rockstar', [
    'ui.router',
    'ui.bootstrap',
    'rockstar.login',
    'event-dispatcher',
    'rockstar.common.services.current-user',
    'rockstar.dashboard.climbs',
    'templates-app',
    'templates-common',
    'ngSanitize',
    'rockstar.dashboard.header',
    'rockstar.dashboard.sidebar',
    'angularMoment'
  ])
  .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, $injector) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
          'header':{
            templateUrl: 'common/layout/header.tpl.html',
            controller: 'HeaderController'
          },
          'sidebar':{
            templateUrl: 'common/layout/sidebar.tpl.html',
            controller: 'SidebarController'
          },
          '':{
            template: '<div ui-view="content"></div>'
          }
        }
      })
    ;

    $httpProvider.responseInterceptors.push(function($q, $location, $injector) { 
      return function(promise) { 
        return promise.then( 
        // Success: just return the response 
          function(response){ 
            return response; 
          }, // Error: check the error status to get only the 401 
          function(response) { 
            if (response.status === 401) $injector.get('$state').transitionTo('login') 
            return $q.reject(response); 
          } 
        ); 
      } 
    }); 

    //$urlRouterProvider.otherwise('');
  })

