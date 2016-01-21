(function(angular){
  "use strict";
  /**
   * @name LocalServices
   * @desc Storage and Get localstorage items
   */
  function LocalService(){
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
  
  angular.module('KaosLatinServer')
  .factory('LocalService',LocalService);
})(angular);
