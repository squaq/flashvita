'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('SelecaoCtrl', function ($scope, $rootScope, $routeParams, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var id = $routeParams.param;
//    console.log('meu id',id);
    
    var canvas = document.getElementById('canvas');
    
    var context = canvas.getContext('2d');
    
    canvas.width = 750;
    canvas.height = 1117;
    
//    console.log(canvas);
//    console.log(context);
    $scope.upImg = '';
    
    $http.get('https://integration.squidit.com.br/v1/monitoring/'+id+'/medias', {headers : {'Authorization': $rootScope.tk}})
    .then(function(s){
        console.log('success',s);
//        $scope.imgs = nu
        
        var a = [];
        for(var i in s.data.data ){
            var std = s.data.data[i].images.standard_resolution.url;
            var tmb = s.data.data[i].images.thumbnail.url;
            var name = s.data.data[i].caption.from.username;
            
            var d = new Date(s.data.data[i].createdAt);
            d = d.valueOf();
            
            std =std.slice(0, std.indexOf('?'));
            tmb =tmb.slice(0, tmb.indexOf('?'));
            
            var img = { 'img':std, 'thumb':tmb, 'name':name, 'date':d };
            a.push(img);
        }
        console.log(a);
        $scope.imgs = a;
        
    }, function(e){
        console.log('error',e);
    });
    
    
    
    
    if($rootScope.images){ $scope.imgs = $rootScope.images; }
//    console.log($rootScope.images);
    
    $scope.clickBt = function(url){
        console.log(url);
        var img = new Image();
        img.src = url;
        console.log(img);
        img.onload = function() {
            context.drawImage(img, 25, 123, 700, 700);
//            context.drawImage(img, 25, 123, 640, 640);
        };
        
//        $location.path('/about');
    }
    
    $scope.fileNameChanged = function (ele) {
        if(ele.files && ele.files[0])
        {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result);
                var img = new Image();
                img.src = e.target.result;
                context.drawImage(img, 0, 0, 750, 1117);
            };
            reader.readAsDataURL(ele.files[0]);

        }
    }
    
    
    $scope.print = function (){
        console.log(canvas.toDataURL())
//        var dataUrl = document.getElementById('canvas').toDataURL()
//        var win=window.open();
//        win.document.write("<br><img src='"+dataUrl+"'/>");
//        win.print();
//        win.location.reload();
    }
    
  });
