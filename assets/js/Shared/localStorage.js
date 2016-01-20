(function(angular){
  "use strict";
  angular.module('kls.services').factory('LocalService', factory);
  function factory(){
    return {
      get: get,
      set: set,
      unset: unset
    }
    function get(key){
      return localStorage.getItem(key);
    }
    
    function set(key,val){
      return localStorage.setItem(key,val);
    }
    
    function unset(key){
      return localStorage.removeItem(key);
    }
    
  }
})(angular);
