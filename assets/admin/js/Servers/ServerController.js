(function(angular){
	"use strict";
	angular.module('KLSAdmin').controller('ServerController',['servers',controller]);
	function controller(servers){
		var vm = this;
		vm.servers = servers;
	}
})(angular);