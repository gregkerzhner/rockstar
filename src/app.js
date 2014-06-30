angular.module('rockstar', [
    'ui.router',
    'templates-main',
    'rockstar.login',
    'rockstar.common.services.current-user',
    'rockstar.header',
    'rockstar.dashboard-container',
    'rockstar.dashboard.user-climbs',
    'rockstar.dashboard.user-climb',
    'rockstar.dashboard.attempt',
    'rockstar.tracker',
    'rockstar.new-climb',
    'config'
  ])
  .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, $injector) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('rockstar', {
        url: '',
        views: {
          'content':{
            template: '<div ui-view></div>'
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
            if (response.status === 401) $injector.get('$state').transitionTo('rockstar.login') 
            return $q.reject(response); 
          } 
        ); 
      } 
    }); 

    //$urlRouterProvider.otherwise('');
  })

