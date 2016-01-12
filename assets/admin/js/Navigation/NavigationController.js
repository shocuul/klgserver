(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.controller('NavCtrl',['$scope','$mdSidenav','NavService',function($scope,$mdSidenav,NavService){
		$scope.toggleSidenav = function(menuId){
			$mdSidenav(menuId).toggle();
		}
		$scope.menuItems = NavService.menu();
		
	}]);
})(angular);