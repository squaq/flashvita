'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('CampanhasCtrl', function ($scope, $auth, $http, $routeParams, $rootScope, $location, $window, $uibModal) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
//    var cId = '16c9557d66fe46a2ba0c42a94d62a89a',
//        cSec = '811fefc5d24e49189e243bbb9c444baa',
//        redirectUri = 'http://localhost:9000', 
//        urlApi = 'http://localhost/~squaq/api.php';
    $scope.images = null;
    
    $http.get('https://integration.squidit.com.br/v1/monitoring', {headers : {'Authorization': $rootScope.tk}})
    .then(
        function(s){
            
//            var a = [];
            for(var i in s.data ){
                var d = new Date(s.data[i].created_at);
                s.data[i].created_at = d.valueOf();
            }
            $scope.hashes = s.data;
        }, 
        function(e){
            console.log('error', e);
        }
    );
    
    $scope.gotocam = function(id){
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/moldeselect.html',
            controller: 'ModelSelectCtrl',
            size: 'lg',
            resolve: {
                moldes: function () {
                  return $rootScope.moldes;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            console.log('selectedItem', selectedItem);
            if(selectedItem.fileVert) { $rootScope.moldes.fileVert =  selectedItem.fileVert; }
            if(selectedItem.fileHori) { $rootScope.moldes.fileHori =  selectedItem.fileHori; }
            if((!selectedItem.fileVert && !selectedItem.fileHori) && !$rootScope.moldes.fileVert && !$rootScope.moldes.fileHori){ return; }
            
            $location.path('/selecao/'+id);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };
    
    
//    var modalInstance = $uibModal.open({
//      animation: true,
//      templateUrl: 'views/modelsel.html',
////      controller: 'ModalInstanceCtrl',
//      size: 'lg'
////      resolve: {
////        items: function () {
////          return $scope.items;
////        }
////      }
//    });
    
    
    
    
    
    
    
//    $window.localStorage.setItem(key,value);
//    $window.localStorage.removeItem('fvcode');
//    $window.localStorage.removeItem('fvtoken');
    
//    console.log($routeParams);
//    console.log($window.localStorage.getItem('fvcode'));
//    console.log($window.localStorage.getItem('fvtoken'));
//    console.log($location.hash);
//    $scope.sigBt = $window.localStorage.getItem('fvtoken');
//    $scope.hashsearch= '';
    
    
//    if($routeParams.code){
//        $window.localStorage.setItem('fvcode', $routeParams.code);
////        window.location = "/";
//    }
    
//    if($window.localStorage.getItem('fvcode') && !$window.localStorage.getItem('fvtoken')){
//        
//        $http.get(urlApi+'?func=token&id='+cId+'&sec='+cSec+'&uri='+redirectUri+'&code='+$window.localStorage.getItem('fvcode')).then(function(success){
//            console.log(success);
//            if(success.status === 200 && success.data.access_token){
//               $window.localStorage.setItem('fvtoken', success.data.access_token);
//                window.location = "/";
//            }
//            else{ 
//                console.log('success error', success.data);
////                $scope.reset(); 
//            }
//            
//        }, function(error){
//            console.log('error', error)
////            $scope.reset();
//        });
//        
//    }
    
//    $scope.reset = function (){
//        $window.localStorage.removeItem('fvcode');
//        $window.localStorage.removeItem('fvtoken');
//        window.location = '/';
//    }
//
//    $scope.pesquisar = function(){
//        $http.get(urlApi+'?func=tags&tag='+$scope.pesquisar+'&token='+$window.localStorage.getItem('fvtoken'))
//        .then(function(s){
//            var a = [];
//            for(var i in s.data ){
//                var std = s.data[i].images.standard_resolution.url;
//                var tmb = s.data[i].images.thumbnail.url;
//
//                std =std.slice(0, std.indexOf('?'));
//                tmb =tmb.slice(0, tmb.indexOf('?'));
//                
//                
//                
//                var img = { 'img':std,
//                            'thumb':tmb
//                          };
//                a.push(img);
////                
//            }
//            
//            $rootScope.images = a;
//            $location.path('/about');
////            console.log('success', a)
//        }, function(e){console.log('error', e)});
//    }
//    
//    $scope.authenticate = function(provider) {
//        console.log("aqui!!");
//        var config = {headers : {
//            'Authorization': masterToken
//        }};
//        $http.get('https://integration.squidit.com.br/v1/monitoring', config)
//        .then(
//            function(s){
//                console.log('success',s)
//            }, 
//            function(e){
//                console.log('error', e);
//            }
//        );
////        window.location = 'https://api.instagram.com/oauth/authorize/?client_id='+cId+'&redirectUri='+redirectUri+'&response_type=code';
//    };
  });