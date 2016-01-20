(function(angular){
  "use strict";
  
  var app = angular.module('kls.controllers',[]);
  app.controller('DashboardCtrl',['$uibModal','ServerService','servers',controller]);
  
  app.controller('CreateServerModalCtrl',['$uibModalInstance','$rootScope','ServerService',modalController]);
  
  app.filter('progress',['$sce',function($sce){
    return function(status){
      return !status ? $sce.trustAsHtml('<span class="label label-info">Instalando</span>') : $sce.trustAsHtml('<span class="label label-success">Completo</span>');
    }
  }]);
  
  function controller($uibModal, ServerService, servers){
    var vm = this;
    vm.servers = servers;
    vm.delete = function(server){
      ServerService.remove(server);
    }
    vm.openCreateModal = function(){
      var modalInstance = $uibModal.open({
        animation:true,
        templateUrl:'Modals/new-server.html',
        controller:'CreateServerModalCtrl'
      });
      modalInstance.result.then(function(){
      })
    }
  }
  
  
  
  
  function modalController($uibModalInstance,$rootScope, ServerService){
    var vm = this;
    vm.alerts = [];
    vm.closeAlert = closeAlert;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.avaliableServers = [
      {
        server:'csgo',
        display:'Counter Strike GO'
      },
      {
        server:'minecraft',
        display:'Minecraft'
      },
      {
        server:'cs16',
        display:'Counter Strike 1.6'
      }
    ];
    vm.gameTypeMinecraft = [
      {
        gameType:'spigot',
        display:'Spigot'
      },
      {
        gameType:'craftbukkit',
        display:'Craftbukkit'
      },
      {
        gameType:'vanilla',
        display:'Vanilla'
      }
    ];
    
    function closeAlert(index){
      vm.alerts.splice(index,1);
    }
    
    function ok(){
      if($scope.server.game == undefined){
        $scope.alerts.push({msg:'No a introducido un juego'});
      }else if($scope.server.num_player == undefined){
        $scope.alerts.push({msg:'No a introducido el numero de jugadores'});
      }else{
        //console.log($scope.server);
        ServerService.create($scope.server);
        $uibModalInstance.close();
      }
    }
    
    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
    
    
  }
})(angular);
