(function(angular){
  "use strict";
  angular.module('kls.directives').directive('tslider',function(){
    return{
      restrict:'E',
      scope:{
        images:'=images'
      },
      templateUrl:'Directives/you-slider.html',
      link:function(scope, element, atts){
        
        var rsOptions = {
            dottedOverlay:'none',
            // 
            
            //startwidth:1366,
            //startheight:768,
            navigationType:'bullet',
            navigationArrows:'solo',
            navigationStyle:'preview4',
            fullWidth: element.hasClass('rs-fullwidth')?'on':'off',
            fullScreen: 'off',
            spinner:'spinner4'
        }
        element.find('.tp-banner').show().revolution(rsOptions)
        
      }
    }
  });
})(angular);

  
