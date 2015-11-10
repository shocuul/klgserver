angular.module('KLGServerApp')
  .directive('serverc',function(){
    return {
      restrict:'E',
      templateUrl:'directives-html/you-carrusel.html',
      link:function(scope, element, atts){
        element.owlCarousel({
          loop:true,
          margin:10,
          nav:true,
          responsive:{
            0:{
              items:1
            },
            600:{
              items:3
            },
            1000:{
              items:5
            }
    }
})
        // element.owlCarousel({
        //     stagePadding: 70,
        //     nav:true,
        //     dots: false,
        //     autoplay: false,
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
  });
