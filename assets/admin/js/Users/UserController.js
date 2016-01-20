(function(angular){
	"use strict";
	angular.module('KLSAdmin').controller('UserController',['users',controller]);
	function controller(users){
		var vm = this;
		vm.users = users;
	}
})(angular)