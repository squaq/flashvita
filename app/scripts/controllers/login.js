'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp').controller('LoginCtrl', function ($scope, $rootScope, $routeParams, $http, $cookies, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.loggingin = $scope.code = $cookies.get('fvcode');
    $scope.tk = $cookies.get('fvtk');
//    if($cookies.get('logged')) {
        $location.path('/campanhas')
//    }
    
//Client ID 0f4e066c0f33485a9d34562bc51e6f09
//Client Secret 27d26fa6941245a0a9597ed6360184b0
    var cId = '0f4e066c0f33485a9d34562bc51e6f09',
        cSec = '27d26fa6941245a0a9597ed6360184b0',
        redirect_uri = 'http://localhost:9000',
//        url_api = 'http://localhost/api.php';
        url_api = 'http://localhost/~squaq/api.php';
    $scope.loginClick = function(){
        $scope.loggingin = true;
        window.location = 'https://www.instagram.com/oauth/authorize/?client_id='+cId+'&redirect_uri='+redirect_uri+'&response_type=code';
    }
    
    
    
    if($routeParams.code){
        console.log('$routeParams.code', $routeParams.code)
        $cookies.put('fvcode', $routeParams.code);
        $scope.loggingin = true;
//        $scope.code = $routeParams.code;
        window.location = '/';
    }
    
    if($scope.code){
        requestToken();   
    }
    
    function requestToken(){
        $http.get(url_api+'?func=token&id='+cId+'&sec='+cSec+'&uri='+redirect_uri+'&code='+$scope.code).then(function(success){
                 console.log(success);
                 if(success.status === 200 && success.data.access_token){
                    $cookies.put('fvtk', success.data.access_token);
//                     console.log(success.data)
                     if(success.data.user.id === '617304871'){
                        $cookies.put('logged', true);
                         $rootScope.logged = $cookies.get('logged');
//                        window.location = "/";
                         $location.path("/campanhas");
                     }
                     
                  } else { 
                     console.log('success error', success.data);
     //                $scope.reset(); 
                 }

             }, function(error){
                 console.log('error', error)
     //            $scope.reset();
             });        
    }
    

    
});
