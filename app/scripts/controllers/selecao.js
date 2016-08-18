'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('SelecaoCtrl', function ($scope, $rootScope, $routeParams, $http, $location, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var id = $routeParams.param,
        imgInsta = new Image(),
        imgMolde = null,
        printW = 750,
        printH = 1117,
        mW = 500,
        mH = 750,
        invert = false;
    $scope.moldes = $rootScope.moldes;
    $scope.modelSelected = null;
    
    
    
    if(!$scope.moldes.fileVert && !$scope.moldes.fileHori){ $location.path('/'); }
    console.log(typeof canvas);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    $scope.state = 'load';
    function loadData(){
        $http.get('https://integration.squidit.com.br/v1/monitoring/'+id+'/medias', {headers : {'Authorization': $rootScope.tk}})
        .then(function(s){
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
            $scope.imgs = a;
            $scope.state = 'select_photo';

        }, function(e){
            console.log('error',e);
        });
    }
    loadData();  
    
    if($rootScope.images){ $scope.imgs = $rootScope.images; }
    
    $scope.clickBt = function(url){
        $scope.state = 'load';
        imgInsta.setAttribute('crossOrigin', 'anonymous');
        imgInsta.src = url;
        imgInsta.onload = function() {
            $scope.state = 'select_molde_side';
            $scope.$apply();
        };
    };
    
    $scope.moldeSelect = function(){
        $scope.state = 'time_to_print';
        
        if($scope.modelSelected === 'vert') {
            mW = canvas.width = 500;
            mH = canvas.height = 750;
            printW = 750;
            printH = 1117;            
            $scope.moldes.fileVert.file.setAttribute('crossOrigin', 'anonymous');
            imgMolde = $scope.moldes.fileVert.file
            $rootScope.instaImg.x = 16;
            $rootScope.instaImg.y = 82;
        }
        else {
            mW = canvas.width = 750;
            mH = canvas.height = 500;
            printW = 1117;
            printH = 750;            $scope.moldes.fileHori.file.setAttribute('crossOrigin', 'anonymous');
            imgMolde = $scope.moldes.fileHori.file;
            $rootScope.instaImg.x = 82;
            $rootScope.instaImg.y = 16;
        }
        drawCanvas();
    };
    
    $scope.moveImg = function(dir){
        switch(dir){
            case 'left':
                $rootScope.instaImg.x -= 1;
                break;
            case 'right':
                $rootScope.instaImg.x += 1;
                break;            
            case 'up':
                $rootScope.instaImg.y -= 1;
                break;
            case 'down':
                $rootScope.instaImg.y += 1;
                break;
        }
        drawCanvas();
    };
    
    function drawCanvas(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(!invert){
            context.drawImage(imgMolde, 0, 0, mW, mH);
            context.drawImage(imgInsta, $rootScope.instaImg.x, $rootScope.instaImg.y, 470, 470);        
        }
        else{
            context.drawImage(imgInsta, $rootScope.instaImg.x, $rootScope.instaImg.y, 470, 470);        
            context.drawImage(imgMolde, 0, 0, mW, mH);
        }
    }
    
    $scope.getInverte = function() {
        invert = !invert;
        drawCanvas();
    };
    
    $scope.print = function() {
        var win = window.open();
        win.document.write('<body style="margin:0; padding:0;"><img src="'+canvas.toDataURL()+'" style="margin:0; padding:0; width:'+printW+'px; height:'+printH+'px;"/></body>');
        win.print();
        win.close();
        $route.reload();
    };
    
    $scope.selectAnotherPic = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.state = 'select_photo';
    }
    
    $scope.reload = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.state = 'load';
        loadData();
    };
    
  });
