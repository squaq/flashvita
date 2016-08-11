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
        url_api = 'http://localhost/~squaq/api.php';//'http://localhost/api.php';//
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
        window.location = 'https://api.instagram.com/oauth/authorize/?client_id='+cId+'&redirect_uri='+redirect_uri+'&response_type=code';
    };
  });
