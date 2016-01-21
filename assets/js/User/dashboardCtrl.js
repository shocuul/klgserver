(function(angular){
  "use strict";
  /**
   * @name DasboardController
   * @desc Present the server of active user
   * @ngInject
   */
  function DashboardCtrl($uibModal, ServerService, servers){
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
  
  DashboardCtrl.resolve = {
      servers:function(ServerService){
          return ServerService.getAll();
      }
  }
  
  /**
   * @name CreateServerModalCtrl
   * @desc Create new server for the user
   * @ngInject
   */
  function CreateServerModalCtrl($uibModalInstance, ServerService){
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
      if(vm.server.game == undefined){
        vm.alerts.push({msg:'No a introducido un juego'});
      }else if(vm.server.num_player == undefined){
        vm.alerts.push({msg:'No a introducido el numero de jugadores'});
      }else{
        ServerService.create(vm.server);
        $uibModalInstance.close();
      }
    }
    
    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }
  }
  /**
   * @name Progress Filter
   * @desc Show a label to server state
   * @ngInject
   */
  function progress($sce){
      return function(status){
          return !status ? $sce.trustAsHtml('<span class="label label-info">Instalando</span>') : $sce.trustAsHtml('<span class="label label-success">Completo</span>');
      }
  }
  
  function config($stateProvider){
    $stateProvider.state('user.dashboard',{
        url:'/dashboard',
        templateUrl:'User/dashboard.html',
        controllerAs:'vm',
        controller:'DashboardCtrl',
        resolve:DashboardCtrl.resolve
      });
  }
  angular
    .module('KaosLatinServer')
    .controller('DashboardCtrl',DashboardCtrl)
    .controller('CreateServerModalCtrl',CreateServerModalCtrl)
    .filter('progress',progress)
    .config(config);

})(angular);
