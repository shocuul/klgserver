angular.module('KLGServerApp')
.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })
	.directive('eventFocus', function() {
    return function(scope, elem, attr) {
      elem.on('focus', function() {
        elem.parent().addClass('input-filled')
      });
      
      elem.on('blur',function(){
        elem.parent().removeClass('input-filled')
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
    };
  });