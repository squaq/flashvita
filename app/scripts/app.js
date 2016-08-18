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
    'ui.bootstrap',
    'rmHoldButton'
  ])
  .run(function($rootScope){
    $rootScope.tk =  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsib3JnYW5pemF0aW9uIjoiNTc5YmM0Y2I5NWI0YTBiNDJlMzA0YzMyIiwicm9sZXMiOlsic3lzdGVtLmFjY2VzcyIsInN0YXRpc3RpY3MudmlldyIsIm1pc3Npb24uYXBwcm92ZXIiLCJjaGFubmVsLm1hbmFnZSIsIm1vbml0b3JpbmcubWFuYWdlIl19LCJhdWQiOiJpMlBjTFRMdzdnTUtXVDJINU5TU2Jvc1BKaDBTM2xxYSIsImlzcyI6InNxdWlkLWFkbS5hdXRoMC5jb20iLCJzdWIiOiJhdXRoMHw1N2FjYmU5Nzk0NjZlMDc0NzI2YzI5YzMifQ.qJKDyrIqfiw1bfWE6sGzNL5ATbMNGnDF1l3N7VnpbSE';
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
