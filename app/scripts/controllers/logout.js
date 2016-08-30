'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('LogoutCtrl', function ($scope, $rootScope, $cookies ) {

    $cookies.remove('fvcode');
    $cookies.remove('fvtk');
    $cookies.remove('logged');
    window.location = '/';
    
    
    
  });
