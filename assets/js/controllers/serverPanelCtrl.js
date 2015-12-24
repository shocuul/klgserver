angular.module('KLGServerApp')
  .controller('ServerPanelCtrl',function($scope,$sails,$http,CurrentUser, selectServer, ServerControl, $uibModal, Upload){
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
    
    $scope.uploadFiles = function(files){
      if(files && files.length){
        for (var i = 0; i < files.length; i++) {
          Upload.upload({
            url:'server/upload',
            data:{file:files[i],}
          })
          
        }
      }
    }
    
    $scope.rename = function(item){
      var directory = item.id.replace(item.text,'');
      console.log(directory);
      var renameFileModal = $uibModal.open({
        animation:true,
        templateUrl:'modals/rename.html',
        controller: 'RenameFileModal',
        size:'',
        resolve:{
          file : function(){
            return item;
          }
        }
      })
      
      renameFileModal.result.then(function(renamedFile){
        ServerControl.writeResource('rename',renamedFile.id,directory+renamedFile.text)
      })
    } 
    
    $scope.delete = function(item){
      
      var confirmModal = $uibModal.open({
        animation:true,
        templateUrl:'modals/message.html',
        controller:'ConfirmModal',
        resolve:{
          message : function(){
            var msg = {
              header:' ' + (item.children) ? 'Esta seguro que desea eliminar la carpeta.' : 'Esta seguro que desea eliminar el archivo.' +'',
              data:'Despues de realizar esta accion no podra recuperar sus archivos. \n ¿Desea continuar?.'
            }
            return msg;
          }
        }
      });
      
      confirmModal.result.then(function(){
        //Folder Option
        if(item.children){
          ServerControl.writeResource('deleteFolder', item.id,'');
        }
      });
      
    }
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
    
    $scope.createFolder = function(name){
      if($scope.breadcrumb.length > 0){
        var parentFolder = $scope.breadcrumb[$scope.breadcrumb.length - 1];
        ServerControl.writeResource('createFolder', parentFolder.id, name).then(function(response){
          changueFolder(parentFolder);
        });
      }else{
        ServerControl.writeResource('createFolder',$scope.server.base_dir,name).then(function(response){
          ServerControl.getTree().then(function(folders){
          $scope.folders = folders;
          });
        });
      }
      $scope.newFolderName.clear()
    }
    
    function changueFolder(folder){
      ServerControl.getTree(folder.id).then(function(folders){
        $scope.folders = folders;
      })
    }
    $scope.openEdit = function(item){
      if(item.editable){
        var editFileModal = $uibModal.open({
        animation: true,
        templateUrl:'modals/edit-file.html',
        controller:'EditFileModalCtrl',
        size:'lg',
        resolve:{
          file : function(){
            return item;
            }
          }
        });
        editFileModal.result.then(function(content){
          ServerControl.writeResource('editFile',item.id,content)
        })
      
      }
      
      
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
      },
      writeResource:function(operation,idResource,content){
        var data = {
          operation:operation,
          resource: idResource,
          content: content
        }
        return $sails.post('/server/'+currentServer.id+'/write',data).then(function(response){
          console.log(response);
          return response;
        })
      }
    }
  })
  .controller('EditFileModalCtrl',function($scope, $uibModalInstance, file, ServerControl){
    $scope.dontLoader = true;
    $scope.selectedItem = file;
    $scope.content = '';
    (function(){
      $scope.content = '';
       ServerControl.getResource(file.id).then(function(downloadFile){
         if(downloadFile.length > 0){
           $scope.content = downloadFile;
         }
       });
    }());
    
    $scope.ok = function () {
    $uibModalInstance.close($scope.content);
    };

    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('RenameFileModal',function($scope, $uibModalInstance, file){
    $scope.selectedItem = file;
    $scope.ok = function () {
    $uibModalInstance.close($scope.selectedItem);
    };

    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('ConfirmModal',function($scope, $uibModalInstance, message){
    $scope.message = message;
    $scope.ok = function () {
    $uibModalInstance.close();
    };

    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    };
  });
