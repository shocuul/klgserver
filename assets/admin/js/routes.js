(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('anon',{
			abstract:true,
			template:'<ui-view />'
		})
		.state('anon.home',{
			url:'/',
			templateUrl:'Dashboard/_dashboard.html',
			controller:'DashboardController',
			controllerAs:'vm',
			resolve:{
				users:function(UserService){
					return UserService.getAll();
				},
				servers:function(ServerService){
					return ServerService.getAll();
				}
			}
		});
		
		$stateProvider
		.state('admin',{
			abstract:true,
			template:'<ui-view />'
		})
		.state('admin.users',{
			url:'/users',
			templateUrl:'Users/_users.html',
			controller:'UserController',
			controllerAs:'vm',
			resolve:{
				users:function(UserService){
					return UserService.getAll();
				}
			}
		})
		.state('admin.servers',{
			url:'/servers',
			templateUrl:'Servers/_servers.html',
			controller:'ServerController',
			controllerAs:'vm',
			resolve:{
				servers:function(ServerService){
					return ServerService.getAll();
				}
			}
		})
		
		$urlRouterProvider.otherwise('/#');
	}])	
})(angular);