(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.config(function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('anon',{
			abstract:true,
			template:'<ui-view />'
		})
		.state('anon.home',{
			url:'/',
			templateUrl:'Dashboard/_dashboard.html'
		});
		
		$urlRouterProvider.otherwise('/');
	})	
})(angular);