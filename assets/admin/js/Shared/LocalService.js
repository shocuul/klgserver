(function(angular){
	"use strict";
	
	angular.module('KLSAdmin').factory('LocalService',
		factory);
	
	function factory(){
		var service = {
			get:get,
			set:set,
			unset:unset
		};
		return service;
		/* Factory Functions */
		function get(key){
			return localStorage.getItem(key);
		}
		function set(key,value){
			return localStorage.setItem(key,value);
		}
		function unset(key){
			return localStorage.removeItem(key);
		}
	}
	
})(angular);