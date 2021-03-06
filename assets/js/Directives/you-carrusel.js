(function(angular){
  "use strict";
  /**
   * @name serverc
   * @desc Carrouse Directive
   */
  function serverc(){
    return {
      restrict:'E',
      replace:true,
      scope:{
        servers:'=servers'
      },
      templateUrl:'Directives/you-carrusel.html',
      link:function(scope, element, atts){
        if (scope.$last) {
          //console.log("Ultimo repeat")
          element.owlCarousel({
              loop:true,
              stagePadding: 70,
              nav:true,
              dots: false,
              autoplay: true,
              autoplayTimeout: false,
              autoplaySpeed: 600,
              autoplayHoverPause: true,
              navText: ['', ''],
              responsive:{
                  0:{
                      items:1
                  },
                  500:{
                      items:2
                  },
                  992:{
                      items:3
                  },
                  1200:{
                      items:4
                  }
              }
          })
        }
      }
    }
  }
  
  function onLastRepeat() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
              element.parent().owlCarousel({
                  loop:true,
                  stagePadding: 70,
                  nav:true,
                  dots: false,
                  autoplay: false,
                  autoplayTimeout: false,
                  autoplaySpeed: 600,
                  autoplayHoverPause: true,
                  navText: ['', ''],
                  responsive:{
                      0:{
                          items:1
                      },
                      500:{
                          items:2
                      },
                      992:{
                          items:3
                      },
                      1200:{
                          items:4
                      }
                  }
              })
            }, 1);
            
        };
    };
    
    angular
        .module('KaosLatinServer')
        .directive('serverc',serverc)
        .directive('onLastRepeat',onLastRepeat);
})(angular);


  
