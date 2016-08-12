'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('MainCtrl', function ($scope, $auth, $http, $routeParams, $rootScope, $location, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var cId = '16c9557d66fe46a2ba0c42a94d62a89a',
        cSec = '811fefc5d24e49189e243bbb9c444baa',
        redirect_uri = 'http://localhost:9000', 
        url_api = 'http://localhost/~squaq/api.php',
        masterToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsibmFtZSI6IkZlbGlwZSBMaW1hIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2I3NDRmOGFkNzdmZTMyN2FhZjI4Y2JjM2RlZDA0YmE2P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGZmUucG5nIiwiaW1hZ2VzIjp7ImxvZ28iOiIifSwiY25waiI6IiIsInBob25lIjoiIiwiY29udGFjdCI6IiIsImlzUGFydG5lciI6dHJ1ZSwicm9sZXMiOlsic3lzdGVtLmFjY2VzcyIsInN5c3RlbS5hZG1pbiIsIm1pc3Npb24uYXBwcm92ZXIiLCJhY2Nlc3MuaG9va3MiXSwib3JnYW5pemF0aW9uIjoiNTY2MDVjZmFkNGM2MDZjODVlYjEwZGQ2In0sImF1ZCI6ImkyUGNMVEx3N2dNS1dUMkg1TlNTYm9zUEpoMFMzbHFhIiwiaXNzIjoic3F1aWQuYXV0aDAuY29tIiwic3ViIjoiYXV0aDB8NTdhY2JlOTc5NDY2ZTA3NDcyNmMyOWMzIn0.8U5u4_caQv_HaZpqg_uBXnhA3omkFTJLgIb6jrogoyA';//'http://localhost/api.php';//
//    $window.localStorage.setItem(key,value);
//    $window.localStorage.removeItem('fvcode');
//    $window.localStorage.removeItem('fvtoken');
    
//    console.log($routeParams);
    console.log($window.localStorage.getItem('fvcode'));
    console.log($window.localStorage.getItem('fvtoken'));
//    console.log($location.hash);
    $scope.sigBt = $window.localStorage.getItem('fvtoken');
    $scope.hashsearch= '';
    
    
    if($routeParams.code){
        $window.localStorage.setItem('fvcode', $routeParams.code);
        window.location = "/";
    }
    
    if($window.localStorage.getItem('fvcode') && !$window.localStorage.getItem('fvtoken')){
        
        $http.get(url_api+'?func=token&id='+cId+'&sec='+cSec+'&uri='+redirect_uri+'&code='+$window.localStorage.getItem('fvcode')).then(function(success){
            console.log(success);
            if(success.status === 200 && success.data.access_token){
               $window.localStorage.setItem('fvtoken', success.data.access_token);
                window.location = "/";
            }
            else{ 
                console.log('success error', success.data);
//                $scope.reset(); 
            }
            
        }, function(error){
            console.log('error', error)
//            $scope.reset();
        });
        
    }
    
    $scope.reset = function (){
        $window.localStorage.removeItem('fvcode');
        $window.localStorage.removeItem('fvtoken');
        window.location = '/';
    }
//    $scope.isAuthenticated = function() {
//      // check if logged in
//    };
//
//    $scope.linkInstagram = function() {
//      // connect email account with instagram
//    };

    $scope.pesquisar = function(){
        $http.get(url_api+'?func=tags&tag='+$scope.pesquisar+'&token='+$window.localStorage.getItem('fvtoken'))
        .then(function(s){
            var a = [];
            for(var i in s.data ){
                var std = s.data[i].images.standard_resolution.url;
                var tmb = s.data[i].images.thumbnail.url;

                std =std.slice(0, std.indexOf('?'));
                tmb =tmb.slice(0, tmb.indexOf('?'));
                
                
                
                var img = { 'img':std,
                            'thumb':tmb
                          };
                a.push(img);
//                
            }
            
            $rootScope.images = a;
            $location.path('/about');
//            console.log('success', a)
        }, function(e){console.log('error', e)});
    }
    
    $scope.authenticate = function(provider) {
        console.log("aqui!!");
        var config = {headers : {
            'Authorization': masterToken
        }};
        $http.get('https://integration.squidit.com.br/v1/monitoring', config)
        .then(
            function(s){
                console.log('success',s)
            }, 
            function(e){
                console.log('error', e);
            }
        );
//        window.location = 'https://api.instagram.com/oauth/authorize/?client_id='+cId+'&redirect_uri='+redirect_uri+'&response_type=code';
    };
  });
