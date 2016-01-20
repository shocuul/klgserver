(function(angular){
	"use strict";
	
	var app = angular.module('kls.controllers',[]);
	app.controller('EditFileModalCtrl',['$uibModalInstance','file','ServerControl',editController]);
	
	app.controller('RenameFileModal',['$uibModalInstance','file',renameController]);
	
	app.controller('ConfirmModal',['$uibModalInstance','message', confirmController]);
	
	
	function editController($uibModalInstance, file, ServerControl){
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
	
	function renameController($uibModalInstance, file){
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
	
	function confirmController($uibModalInstance, message){
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
	
	
	
})(angular);