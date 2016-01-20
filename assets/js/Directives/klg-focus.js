(function(angular){
  "use strict";
  var app = angular.module('kls.directives',[]);
  
  app.factory('focus',['$timeout','$window', factory]);
  
  function factory($timeout,$window){
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
  
  app.directive('eventFocus',directive);
  function directive(){
    
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
})(angular);