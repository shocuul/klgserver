(function(angular){
	"use strict";
	angular.module('KLSAdmin').controller('DashboardController',['servers','users',controller]);
	
	function controller(servers, users){
		var vm = this;
		vm.servers = servers;
		vm.users = users;
	}
})(angular);