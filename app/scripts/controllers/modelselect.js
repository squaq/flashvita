'use strict';

angular.module('flashvitaApp').controller('ModelSelectCtrl', function ($scope, $uibModalInstance, moldes) {

    if(moldes.fileVert != null) { $scope.mVe = moldes.fileVert.name; }
    if(moldes.fileHori != null) { $scope.mHo = moldes.fileHori.name; }

    $scope.selected = {'fileVert':null, 'fileHori':null};
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected);
//        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    
    $scope.btClickHo = function(){
        angular.element('#ho').trigger('click');
    }
    $scope.btClickVe = function(){
        angular.element('#ve').trigger('click');
    
    }
    
    $scope.fileNameChanged = function (file){
//        console.log(file);
        if(file.files && file.files[0])
        {
            var reader = new FileReader();
            reader.onload = function (e) {
//                console.log(e.target.result);
                var img = new Image();
                img.src = e.target.result;
                
                console.log('in cache',img)
                if(file.id == 've'){ 
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
        
        
    }
});