angular.module('KLGServerApp')
  .controller('ServerPanelCtrl',function($scope,$sails,$http,CurrentUser, selectServer, ServerControl){
    //console.log("Iniciado");
    $scope.server = selectServer;
    console.log($scope.server);
    $scope.imagenFondo = ""
    $scope.start = function(){
      console.log("Servidor Iniciado")
      ServerControl.startServer()
    }
    $scope.restart = function(){
      console.log("Servidor Reiniciado")
    }
    $scope.stop = function(){
      console.log("Servidor Detenido")
    }
  }).factory('ServerControl',function($sails){
    var currentServer = currentServer || {};
    return{
      getServerInfo:function(idServer){
        return $sails.get('/server/'+idServer).then(function(response){
          console.log(response)
          currentServer = response.data;
          return currentServer
        },function(err){
          console.log(err);
        })
      },
      startServer:function(){
        return $sails.post('/server/'+currentServer.id+'/start').then(function(response){
          console.log(response)
        })
      }
    }
  });
