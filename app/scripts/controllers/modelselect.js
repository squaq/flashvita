'use strict';

angular.module('flashvitaApp').controller('ModelSelectCtrl', function ($scope, $uibModalInstance, moldes) {

    if(moldes.fileVert !== null) { $scope.mVe = moldes.fileVert.name; }
    if(moldes.fileHori !== null) { $scope.mHo = moldes.fileHori.name; }

    $scope.selected = {'fileVert':null, 'fileHori':null};
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
    
    $scope.btClickHo = function(){
        angular.element('#ho').trigger('click');
    };
    $scope.btClickVe = function(){
        angular.element('#ve').trigger('click');
    
    };
    
    $scope.fileNameChanged = function (file){
        if(file.files && file.files[0])
        {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                
                if(file.id === 've'){ 
                    $scope.mVe = file.files[0].name;
                    $scope.selected.fileVert =  {'name':file.files[0].name, 'file':img};
                }
                else { 
                    $scope.mHo = file.files[0].name;
                    $scope.selected.fileHori = {'name':file.files[0].name, 'file':img};
                }
                $scope.$apply();
            };
            reader.readAsDataURL(file.files[0]);

        }
    };
    
    $scope.remove = function(name){
        console.log(name)
        switch(name){
            case 'hori':
                $scope.mHo = $scope.selected.fileHori = null;
                break;
            case 'vert':
               $scope.mVe = $scope.selected.fileVert = null;
                break;
        }
    }
});