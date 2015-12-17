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
    // File Manager Functions 
    $scope.goToRoot = function(){
      $scope.breadcrumb = [];
      ServerControl.getTree().then(function(folders){
        $scope.folders = folders;
      });
    }
    $scope.getTree = function(folder){
      
      $scope.breadcrumb.push(folder);
      changueFolder(folder);
    }
    
    $scope.changeFolder = function(folder,$index){
      for (var index = $index+1; index <= $scope.breadcrumb.length; index++) {
        $scope.breadcrumb.splice(index, 1);
      }
      changueFolder(folder);
    }
    
    function changueFolder(folder){
      ServerControl.getTree(folder.id).then(function(folders){
        $scope.folders = folders;
      })
    }
    $scope.getResource = function(item){
      console.log(item);
      ServerControl.getResource(item.id);
    }
    
    //////////////////////////////////////////////
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
      },
      getResource:function(idResource){
        var data = {
          resource: idResource
        }
        return $sails.post('/server/'+currentServer.id+'/resource',data).then(function(response){
          console.log(response);
          return response.data;
        })
      }
    }
  })
  .controller('EditFileModalCtrl',function($scope,  $uibModalInstance){
    
  });
