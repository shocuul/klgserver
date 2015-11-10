angular.module('KLGServerApp')
  .directive('serverc',function(){
    return {
      restrict:'E',
      replace:true,
      scope:{
        servers:'=servers'
      },
      templateUrl:'directives-html/you-carrusel.html',
      link:function(scope, element, atts){
        if (scope.$last) {
          console.log("Ultimo repeat")
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
        };
        // if (scope.$last) setTimeout(function(){
        //   console.log("Ultimo repeat")
        //   element.owlCarousel({
        //       loop:true,
        //       stagePadding: 70,
        //       nav:true,
        //       dots: false,
        //       autoplay: true,
        //       autoplayTimeout: false,
        //       autoplaySpeed: 600,
        //       autoplayHoverPause: true,
        //       navText: ['', ''],
        //       responsive:{
        //           0:{
        //               items:1
        //           },
        //           500:{
        //               items:2
        //           },
        //           992:{
        //               items:3
        //           },
        //           1200:{
        //               items:4
        //           }
        //       }
        //   })
        // }, 0.0001);
        // element.find('.youplay-carousel').owlCarousel({
        //     loop:true,
        //     stagePadding: 70,
        //     nav:true,
        //     dots: false,
        //     autoplay: true,
        //     autoplayTimeout: false,
        //     autoplaySpeed: 600,
        //     autoplayHoverPause: true,
        //     navText: ['', ''],
        //     responsive:{
        //         0:{
        //             items:1
        //         },
        //         500:{
        //             items:2
        //         },
        //         992:{
        //             items:3
        //         },
        //         1200:{
        //             items:4
        //         }
        //     }
        // })


      }
    }
  })
  .directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
              console.log("Ultimo repeat")
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
    });
