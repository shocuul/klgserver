(function(angular){
	"use strict";
	
	
	
	/**
     * @name EditFileModalCtrl
     */
	function EditFileModalCtrl($uibModalInstance, file, ServerControl){
		var vm = this;
		vm.dontLoader = true;
		vm.selectedItem = file;
		vm.content = '';
		downloadContent();
		
		vm.ok = ok;
		vm.cancel = cancel;
		
		/* Controller Function */
		
		function ok(){
			$uibModalInstance.close(vm.content);
		}
		
		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
		
		/* Private functions */
		
		function downloadContent(){
			ServerControl.getResource(file.id).then(function(downloadFile){
         		if(downloadFile.length > 0){
           			vm.content = downloadFile;
         		}
       		});
		}	
	}
	
    /**
     * @name RenameFileModal
     */
	function RenameFileModal($uibModalInstance, file){
		var vm = this;
		vm.selectedItem = file;
		vm.ok = ok;
		vm.cancel = cancel;
		
		/* Controller Functions */ 
		
		function ok(){
			$uibModalInstance.close(vm.selectedItem);
		}
		
		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
	
    /**
     * @name ConfirmModal
     */
	function ConfirmModal($uibModalInstance, message){
		var vm = this;
		vm.message = message;
		vm.ok = ok;
		vm.cancel = cancel;
		
		function ok(){
			$uibModalInstance.close();
		}
		
		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
	
    
    angular.module('KaosLatinServer')
    .controller('EditFileModalCtrl',EditFileModalCtrl)
    .controller('RenameFileModal',RenameFileModal)
    .controller('ConfirmModal',ConfirmModal);
	
	
})(angular);