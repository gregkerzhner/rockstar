angular.module('rockstar', [
    'ui.router',
    'ui.bootstrap',
    'rockstar.login',
    'event-dispatcher',
    'rockstar.common.services.current-user',
    'rockstar.dashboard.container',
    'templates-app',
    'templates-common',
    'ngSanitize',
    'angularMoment'
  ])
  .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, $injector) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.tpl.html',
        abstract: true
      })

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
  })

