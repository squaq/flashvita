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
    'satellizer',
    'ui.bootstrap'
  ])
  .run(function($rootScope){
    $rootScope.tk =  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsibmFtZSI6IkZlbGlwZSBMaW1hIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2I3NDRmOGFkNzdmZTMyN2FhZjI4Y2JjM2RlZDA0YmE2P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGZmUucG5nIiwiaW1hZ2VzIjp7ImxvZ28iOiIifSwiY25waiI6IiIsInBob25lIjoiIiwiY29udGFjdCI6IiIsImlzUGFydG5lciI6dHJ1ZSwicm9sZXMiOlsic3lzdGVtLmFjY2VzcyIsInN5c3RlbS5hZG1pbiIsIm1pc3Npb24uYXBwcm92ZXIiLCJhY2Nlc3MuaG9va3MiXSwib3JnYW5pemF0aW9uIjoiNTY2MDVjZmFkNGM2MDZjODVlYjEwZGQ2In0sImF1ZCI6ImkyUGNMVEx3N2dNS1dUMkg1TlNTYm9zUEpoMFMzbHFhIiwiaXNzIjoic3F1aWQuYXV0aDAuY29tIiwic3ViIjoiYXV0aDB8NTdhY2JlOTc5NDY2ZTA3NDcyNmMyOWMzIn0.8U5u4_caQv_HaZpqg_uBXnhA3omkFTJLgIb6jrogoyA';
    $rootScope.moldes = {'fileVert' : null, 'fileHori' : null};
    $rootScope.instaImg = {'x':0, 'y':0};
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/campanhas', {
        templateUrl: 'views/campanhas.html',
        controller: 'CampanhasCtrl'
      })
      .when('/selecao/:param', {
        templateUrl: 'views/selecao.html',
        controller: 'SelecaoCtrl'
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
        redirectTo: '/campanhas'
      });
  });
