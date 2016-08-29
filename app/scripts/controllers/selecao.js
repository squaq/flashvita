'use strict';

/**
 * @ngdoc function
 * @name flashvitaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flashvitaApp
 */
angular.module('flashvitaApp')
  .controller('SelecaoCtrl', function ($scope, $rootScope, $routeParams, $http, $location, $route, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var id = $routeParams.param,
        imgInsta = new Image(),
        imgMolde = null,
        wModel = 750,
        hModel = 1126,
        instaQuad = 636,//701, 636
        mW = 500,
        mH = 750,
        btState = '',
        interval = 0;
    
    $scope.moldes = $rootScope.moldes;
    $scope.modelSelected = null;
    
    if(!$scope.moldes.fileVert && !$scope.moldes.fileHori){ $location.path('/campanhas'); }
    
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled       = true;


    $scope.state = 'load';
    function loadData(){
        $http.get('https://integration.squidit.com.br/v1/monitoring/'+id+'/medias', {headers : {'Authorization': $rootScope.tk}, params:{'limit':400}})
        .then(function(s){
            var a = [];
            for(var i in s.data.data ) {
                
                var std = s.data.data[i].images.standard_resolution.url;
                var tmb = s.data.data[i].images.thumbnail.url;
                var name = s.data.data[i].caption.from.username;

                var d = new Date(s.data.data[i].createdAt);
                d = d.valueOf();

                std =std.slice(0, std.indexOf('?'));
                tmb =tmb.slice(0, tmb.indexOf('?'));

                var img = { 'img':std, 'thumb':tmb, 'name':name, 'date':d };
                a.push(img);
//                console.log(img);
            }
            $scope.imgs = a;
            $scope.state = 'select_photo';

        }, function(e){
            console.log('error',e);
            $scope.state = 'load_error';
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
            mW = canvas.width = wModel;
            mH = canvas.height = hModel;
            $scope.moldes.fileVert.file.setAttribute('crossOrigin', 'anonymous');
            imgMolde = $scope.moldes.fileVert.file;
        }
        else {
            mW = canvas.width = hModel;//1117;
            mH = canvas.height = wModel;//750;
            $scope.moldes.fileHori.file.setAttribute('crossOrigin', 'anonymous');
            imgMolde = $scope.moldes.fileHori.file;
        }
        drawCanvas();
    };
    
    $scope.change = function (na){
        if(na === 'x') {
            $rootScope.instaImg.x = parseInt($rootScope.instaImg.x);
        } else if(na === 'y') {
            $rootScope.instaImg.y = parseInt($rootScope.instaImg.y);
        } 

        drawCanvas();
    }
    
    $scope.mouseDown = function(dir){
        btState = dir;
        interval = setInterval($scope.moveImg, 50);
    };
    
    $scope.mouseUp = function(){
        clearInterval(interval);
    };
    
    $scope.moveImg = function(){
        switch(btState){
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
            case 'in':
                instaQuad += 1;
                break;
            case 'out':
                instaQuad -= 1;
                break;
        };
        console.log($rootScope.instaImg.x, $rootScope.instaImg.y, instaQuad)
        drawCanvas();
    };
    
    function drawCanvas(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(!$rootScope.instaImg.invert){
            context.drawImage(imgMolde, 0, 0, mW, mH);
            context.drawImage(imgInsta, $rootScope.instaImg.x, $rootScope.instaImg.y, instaQuad, instaQuad);        
        }
        else{
            context.drawImage(imgInsta, $rootScope.instaImg.x, $rootScope.instaImg.y, instaQuad, instaQuad);        
            context.drawImage(imgMolde, 0, 0, mW, mH);
        }
    }
    
    $scope.getInverte = function() {
        $rootScope.instaImg.invert = !$rootScope.instaImg.invert;
        drawCanvas();
    };
    
    $scope.saveImg = function(){
        var dt = canvas.toDataURL('image/jpeg');
         window.open(dt,'canvasImage','left=0,top=0,width='+mW+',height='+mH+',toolbar=0,resizable=0');
//        window.open(dt, "_blank");
    };
    
    $scope.saveConf = function(){
        $cookies.put('fvPosX', $rootScope.instaImg.x);
        $cookies.put('fvPosY', $rootScope.instaImg.y);
        $cookies.put('fvPosInvert', $rootScope.instaImg.invert);
    }
    
    $scope.print = function() {
        var win = window.open();
        win.document.write('<body style="margin:0; padding:0;"><img src="'+canvas.toDataURL()+'" style="margin:0; padding:0;"/></body>');
        win.print();
        win.close();
        $route.reload();
    };
    
    $scope.selectAnotherPic = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.state = 'select_photo';
        instaQuad = 700;
    };
    
    $scope.reload = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.state = 'load';
        loadData();
    };
    
  });
