'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('AboutCtrl', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    if($rootScope.images) $scope.imgs = $rootScope.images;
    console.log($rootScope.images);
  });
