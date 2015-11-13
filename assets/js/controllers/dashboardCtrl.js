angular.module('KLGServerApp')
  .controller('DashboardCtrl', function($scope, $uibModal){
    $scope.openCreateModal = function(){
      var modalInstance = $uibModal.open({
        animation:true,
        templateUrl:'modals/new-server.html',
        controller:'CreateServerModalCtrl'
      })
    }
  })
  .controller('CreateServerModalCtrl',function($scope, $uibModalInstance){
    $scope.ok = function(){
      $iubModalInstance.close();
    }
    $scope.cancel = function(){
      $uibModalInstance.dismiss('cancel');
    }
  });
