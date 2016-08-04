'use strict';

/**
 * @ngdoc overview
 * @name flashvitaApp
 * @description
 * # flashvitaApp
 *
 * Main module of the application.
 */
angular
  .module('flashvitaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer'
  ])
  .config(function ($routeProvider, $authProvider, $locationProvider, $httpProvider) {
//    $authProvider.instagram({
//      clientId: '16c9557d66fe46a2ba0c42a94d62a89a'
//    });
    
    $authProvider.loginUrl = 'http://localhost:9000/auth/login';
    $authProvider.signupUrl = 'http://localhost:9000/auth/signup';
    $authProvider.oauth2({
      name: 'instagram',
      url: 'http://localhost:9000/auth/instagram',
      redirectUri: 'http://localhost:9000',
      clientId: '16c9557d66fe46a2ba0c42a94d62a89a',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
    
    // Expose XHR requests to server
//      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      // This is `false` by default
      $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
