(function(angular){
	"use strict";
	angular.module('KLSAdmin')
	.controller('NavCtrl',['$scope','$mdSidenav',function($scope,$mdSidenav){
		$scope.toggleSidenav = function(menuId){
			$mdSidenav(menuId).toggle();
		}
		
	}]);
})(angular)