(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.controller('SessionCtrl',['Auth', controller]);
	
	
	function controller(SessionService,Auth){
		var vm = this;
		vm.auth = Auth;
		vm.login = login;
		vm.logout = logout;
		
		function login(){
			Auth.login(vm.user).success(function(result){
				vm.auth = Auth;
			})
		}
		
		function logout(){
			Auth.logout();
		}
	}
	
})(angular);