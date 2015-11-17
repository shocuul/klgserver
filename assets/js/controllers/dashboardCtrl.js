angular.module('KLGServerApp')
  .controller('DashboardCtrl', function($scope, $uibModal, ServerService, servers){
    $scope.servers = servers;
    $scope.delete = function(server){
      ServerService.remove(server);
    }
    $scope.openCreateModal = function(){
      var modalInstance = $uibModal.open({
        animation:true,
        templateUrl:'modals/new-server.html',
        controller:'CreateServerModalCtrl'
      });
      modalInstance.result.then(function(server){
        ServerService.create(server);
      })
    }
  })
  .controller('CreateServerModalCtrl',function($scope, $uibModalInstance,$rootScope){
    $scope.alerts = [];
    $scope.server = {};
    $scope.avaliableServers = [
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
    $scope.gameTypeMinecraft = [
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
    ]
    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
    };
    $scope.ok = function(){
      console.log("OK Cliked");
      if($scope.server.game == undefined){
        $scope.alerts.push({msg:'No a introducido un juego'});
      }else if($scope.server.num_player == undefined){
        $scope.alerts.push({msg:'No a introducido el numero de jugadores'});
      }else{
        //console.log($scope.server);
        $uibModalInstance.close($scope.server);
      }

    }
    $scope.cancel = function(){
      $uibModalInstance.dismiss('cancel');
    }
  })
  .filter('progress',function($sce){
    return function(status){
      return !status ? $sce.trustAsHtml('<span class="label label-info">Instalando</span>') : $sce.trustAsHtml('<span class="label label-success">Completo</span>');
    }
  });
