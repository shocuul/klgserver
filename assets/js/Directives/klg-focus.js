(function(angular){
  "use strict";
  
  /**
   * @name focus
   * @desc Focus Factory
   * @ngInject
   */
  function focus($timeout,$window){
    return function(id){
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    }
  }
  
  /**
   * @name eventFocus
   * @desc Event Focus
   * @ngInject
   */
  function eventFocus(){
    
    return blurAndFocus;
    
    function blurAndFocus(scope,elem,attr){
      elem.on('focus',function(){
        elem.parent().addClass('input-filled');
      });
      
      elem.on('blur',function(){
        elem.parent().removeClass('input-filled');
      });
    }
  }
  
  angular.module('KaosLatinServer')
  .factory('focus',focus)
  .directive('eventFocus',eventFocus);
  
})(angular);