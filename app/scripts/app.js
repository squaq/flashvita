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
    'rmHoldButton',
    'ngCookies'
  ])
  .run(function($rootScope, $cookies){
    $rootScope.tk =  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsib3JnYW5pemF0aW9uIjoiNTc5YmM0Y2I5NWI0YTBiNDJlMzA0YzMyIiwicm9sZXMiOlsic3lzdGVtLmFjY2VzcyIsInN0YXRpc3RpY3MudmlldyIsIm1pc3Npb24uYXBwcm92ZXIiLCJjaGFubmVsLm1hbmFnZSIsIm1vbml0b3JpbmcubWFuYWdlIl19LCJhdWQiOiJpMlBjTFRMdzdnTUtXVDJINU5TU2Jvc1BKaDBTM2xxYSIsImlzcyI6InNxdWlkLWFkbS5hdXRoMC5jb20iLCJzdWIiOiJhdXRoMHw1N2FjYmU5Nzk0NjZlMDc0NzI2YzI5YzMifQ.qJKDyrIqfiw1bfWE6sGzNL5ATbMNGnDF1l3N7VnpbSE';
    $rootScope.moldes = {'fileVert' : null, 'fileHori' : null};
    $rootScope.instaImg = {'x':0, 'y':0, invert:false};
    
    $rootScope.instaImg.x =($cookies.get('fvPosX'))? parseInt($cookies.get('fvPosX')) : 0;
    $rootScope.instaImg.y =($cookies.get('fvPosY'))? parseInt($cookies.get('fvPosY')) : 0;
    $rootScope.instaImg.invert =($cookies.get('fvPosInvert'))? $cookies.get('fvPosInvert') : false;
    
    $rootScope.logged = $cookies.get('logged');
    console.log('$rootScope.logged',$rootScope.logged);

    
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/campanhas', {
        templateUrl: 'views/campanhas.html',
        controller: 'CampanhasCtrl'
      })
      .when('/selecao/:param', {
        templateUrl: 'views/selecao.html',
        controller: 'SelecaoCtrl'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })
.directive('ldImg', function () {       
    return {
        link: function(scope, element, attrs) {   

            element.bind('load', function() {
//                console.log('image is loaded');
            });
            element.bind('error', function(e){
                angular.element(e.currentTarget).parent().addClass('hide')
            });
        }
    }
});;
