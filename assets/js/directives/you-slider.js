angular.module('KLGServerApp')
  .directive('tslider',function(){
    return{
      restrict:'E',
      scope:{
        images:'=images'
      },
      templateUrl:'directives-html/you-slider.html',
      link:function(scope, element, atts){
        var rsOptions = {
            dottedOverlay:'none',
            // startwidth:1366,
            // startheight:768,
            navigationType:'bullet',
            navigationArrows:'solo',
            navigationStyle:'preview4',
            fullWidth: element.hasClass('rs-fullwidth')?'on':'off',
            fullScreen: 'on',
            spinner:'spinner4'
        }
        element.find('.tp-banner').show().revolution(rsOptions)
      }
    }
  });
