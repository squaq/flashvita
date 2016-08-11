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
    var canvas = document.getElementById('canvas');
    
    var context = canvas.getContext('2d');
    
    canvas.width = 750;
    canvas.height = 1117;
    
    console.log(canvas);
    console.log(context);
    $scope.upImg = "";
    
    
    if($rootScope.images) $scope.imgs = $rootScope.images;
    console.log($rootScope.images);
    
    $scope.clickBt = function(url){
        console.log(url);
        var img = new Image();
        img.src = url;
        console.log(img)
        img.onload = function() {
            context.drawImage(img, 0, 0, 600, 600);
        }
        
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
