'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('MainCtrl', function ($scope, $auth, $http, $routeParams, $rootScope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // Sends this header with any AJAX request
    
    
    console.log($routeParams);
    console.log($rootScope.local);
//    console.log($location.hash);
    
//    if($routeParams.)
    if($routeParams.code){
        $rootScope.code = $routeParams.code;
        
//        window.location = 'https://api.instagram.com/oauth/authorize/?client_id=16c9557d66fe46a2ba0c42a94d62a89a&redirect_uri=http://localhost:9000&response_type=token';
//        $http.get('https://api.instagram.com/oauth/authorize/?client_id=16c9557d66fe46a2ba0c42a94d62a89a&redirect_uri=http://localhost:9000&response_type=token')
//            .then(function(success){console.log('success',success);}, function(error){console.log('error',error)});
//        $rootScope.local = window.location;
//        console.log(window.location);
        
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // Send this header only in post requests. Specifies you are sending a JSON object
        $http.defaults.headers.post['dataType'] = 'json';
        
        $http({
            url:'https://api.instagram.com/oauth/access_token',
            method:'GET',
            
            data:{
                client_id:'16c9557d66fe46a2ba0c42a94d62a89a',
                client_secret: '811fefc5d24e49189e243bbb9c444baa',
                grant_type:'authorization_code',
                redirect_uri:'http://localhost:9000',
                code:$routeParams.code
            
            }
        }).then(function(success){console.log('success',success);}, function(error){console.log('error',error)});
        
//        $http.get('https://api.instagram.com/v1/tags/fillen/media/recent?access_token='+$routeParams.code).then(function(success){console.log('success',success);}, function(error){console.log('error',error)});
        
//        $routeParams.code
    }
//    $scope.isAuthenticated = function() {
//      // check if logged in
//    };
//
//    $scope.linkInstagram = function() {
//      // connect email account with instagram
//    };

    
    
    $scope.authenticate = function(provider) {
        
        window.location = 'https://api.instagram.com/oauth/authorize/?client_id=16c9557d66fe46a2ba0c42a94d62a89a&redirect_uri=http://localhost:9000&response_type=code'
//        $http.get('https://api.instagram.com/oauth/authorize/?client_id=16c9557d66fe46a2ba0c42a94d62a89a&redirect_uri=http://localhost:9000&response_type=code', {
//            name: 'instagram',
//            url: 'http://localhost:3000/auth/instagram',
//            redirectUri: 'http://localhost:9000',
//            clientId: '16c9557d66fe46a2ba0c42a94d62a89a',
//            requiredUrlParams: ['scope'],
//            scope: ['likes'],
//            scopeDelimiter: '+',
//            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
//        })
//        .then(function(success){console.log('success',success);}, function(error){console.log('error',error)});
        
//        console.log(provider);
        
//        cc8c5f8757d24f4c80c3e7280c1542aa
        
//        $auth.authenticate(provider);
    };
  });
