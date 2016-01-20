(function(angular){
  "use strict";
  
  /**
   * @name ServerPanelCtrl
   */
  function ServerPanelCtrl($sails,$http,CurrentUser, selectServer, ServerControl, $uibModal, Upload){
    var vm = this;
    vm.server = selectServer;
    vm.breadcrumb = [];
    initTree();
    vm.start = start;
    vm.restart = restart;
    vm.stop = stop;
    vm.uploadFiles = uploadFiles;
    vm.rename = rename;
    vm.delete = deleteFile;
    vm.goToRoot = goToRoot;
    vm.getTree = getTree;
    vm.changeFolder = changeFolder;
    vm.createFolder = createFolder;
    vm.openEdit = openEdit;
    /* Controller Functions */
    function initTree(){
      ServerControl.getTree().then(function(folders){
        vm.folders = folders;
      })
    }
    
    function uploadFiles(files){
      if(files && files.length){
        for (var i = 0; i < files.length; i++) {
          Upload.upload({
            url:'server/upload',
            data:{file:files[i],}
          })
          
        }
      }
    }
    
    function rename(item){
      var directory = item.id.replace(item.text,'');
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
    
    function deleteFile(item){
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
    
    function goToRoot(){
      vm.breadcrumn = [];
      ServerControl.getTree().then(function(folders){
        vm.folders = folders;
      });
    }
    
    function getTree(folder){
      vm.breadcrumb.push(folder);
      getFolder(folder);
    }
    
    function changeFolder(folder,$index){
      for(var index = $index+1; index <= vm.breadcrumb.length; index++){
        vm.breadcrumb.splice(index, 1);
      }
      getFolder(folder);
    }
    
    function createFolder(name){
      if(vm.breadcrumb.length > 0){
        var parentFolder = vm.breadcrumb[$scope.breadcrumb.length -1];
        ServerControl.writeResource('createFolder', parentFolder.id, name).then(function(response){
          getFolder(parentFolder);
        });
      }else{
        ServerControl.writeResource('createFolder',vm.server.base_dir,name).then(function(response){
          ServerControl.getTree().then(function(folders){
          vm.folders = folders;
          });
        });
      }
      vm.newFolderName.clear();
    }
    
    
    function openEdit(item){
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
    
    
    /* private controller methods */
    function getFolder(folder){
      ServerControl.getTree(folder.id).then(function(folders){
        vm.folders = folders;
      })
    }
  }
  
    angular.module('KaosLatinServer')
        .controller('ServerPanelCtrl',ServerPanelCtrl);
})(angular);
