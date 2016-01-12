(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.service('NavService',function(){
		var menuItems = [
			{
				icon:'gamepad',
				name:'Servers'
			},
			{
				icon:'supervisor_account',
				name:'Usuarios'
			}
		]
		return {
			menu : function(){
				return menuItems;
			}
		}
	});
})(angular);