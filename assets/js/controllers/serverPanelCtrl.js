angular.module('KLGServerApp')
  .controller('ServerPanelCtrl',function($scope,$sails,$http,CurrentUser, selectServer, ServerControl){
    //console.log("Iniciado");
    $scope.server = selectServer;
    $scope.breadcrumb = [];
    console.log($scope.server);
    $scope.imagenFondo = "";
    (function(){
      ServerControl.getTree().then(function(folders){
        console.log(folders);
        $scope.folders = folders;
      });
    }());
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
    $scope.getTree = function(folder){
      
      $scope.breadcrumb.push(folder);
    }
    
    $scope.changeFolder = function(folder,$index){
      for (var index = $index+1; index <= $scope.breadcrumb.length; index++) {
        $scope.breadcrumb.splice(index, 1);
        
      }
      console.log($index);
    }
  }).factory('ServerControl',function($sails){
    var currentServer = currentServer || {};
    return{
      getServerInfo:function(idServer){
        return $sails.get('/server/'+idServer).then(function(response){
          
          currentServer = response.data;
          return currentServer
        },function(err){
          
        })
      },
      startServer:function(){
        return $sails.post('/server/'+currentServer.id+'/start').then(function(response){
          
        })
      },
      getTree:function(idResource){
        console.log("GetTree");
        if(idResource != undefined){
          var data = {
            id: idResource
          }
        }else{
          var data = {}
        }
        return $sails.post('/server/'+currentServer.id+'/tree',data).then(function(response){
          return response.data;
        })
      }
    }
  });
