/*!--------------------------------------------------------------------
  Name: Youplay - Game Template based on Bootstrap
  Version: 1.2.0
  Author: nK
  Website: http://nkdev.info
  Support: http://nk.ticksy.com
  Purchase: http://themeforest.net/item/youplay-game-template-based-on-bootstrap/11306207?ref=_nK
  License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
  Copyright 2015.
-------------------------------------------------------------------
  Port for angularJS by josepdvahn
-------------------------------------------------------------------  */
(function(window, navigator, angular, $){
	'use strict';
	/* You Play Instance Service */
	angular.module('KLGServerApp').service('youplay',function(){
    var YP = function(options){
      var _this = this;
      _this.options = options
      _this.$window = $(window)
      _this.$document = $(document)
      
      // check if mobile
      _this.isMobile =  /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera)
      
      //Preloader 
      _this.$preloader = $('.page-preloader')
      
      //content
      _this.$content = $('.content')
      
      //navbar 
      _this.$navbar = $('.navbar-youplay')
      _this.$navbarToggleBtn = _this.$navbar.find('[data-toggle=off-canvas]')
      _this.$navbarToggleTarget = _this.$navbar.find( _this.$navbarToggleBtn.attr('data-target') )
      _this.navbarSmall = false
      _this.navbarMaxTop = 100
      
      // search
      _this.$searchToggle = $('.search-toggle')
      _this.$searchBlock = $('.search-block')
      
      // inputs 
      _this.$inputs = $('input, textarea')
      
      //
      // ajax contact form
      _this.$ajaxForm = $('.youplay-form-ajax')

      // hevagon rating
      _this.$hexagonRating = $('.youplay-hexagon-rating')

      // accordions
      _this.$accordions = $('.youplay-accordion')

      // owl carousel
      _this.$carousels = $('.youplay-carousel')
      _this.$sliders = $('.youplay-slider')
      _this.$owlCarousel = $('.owl-carousel')

      // magnific popup
      _this.$imagePopup = $('.image-popup')
      _this.$galleryPopup = $('.gallery-popup')
      _this.$videoPopup = $('.video-popup')

      // revolution slider
      _this.$revSlider = $('.rs-youplay')

      // isotope
      _this.$isotope = $('.isotope')

      // skrollr
      _this.skrollr
    }
    YP.DEFAULT = {
      parallax: true, 
      navbarSmall: false,
      fadeBetweenPages: true
    }
    
    /*Start Method */
    YP.prototype.init = function(options){
      var _this = this
      //init options
      _this.options = $.extend({}, this.options, options)
      
      $(window).load(function(){
        if(!_this.options.navbarSmall){
          _this.options.navbarSmall = _this.$navbar.hasClass('navbar-small')
        }
        // fade between pages
        if( _this.options.fadeBetweenPages ) {
            _this.fadeBetweenPages()
        }
        // init tooltips and popovers
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        })
        $('[data-toggle="popover"]').popover()
        
        // Owl Carousel
        if( typeof $.fn.owlCarousel !== 'undefined' ) {
            _this.initOwlCarousel()
        }
        
        // Magnific Popup
        if( typeof $.fn.magnificPopup !== 'undefined' ) {
            _this.initMagnificPopup()
        }
        
        // Slider Revolution
        if( typeof $.fn.revolution !== 'undefined' ) {
            _this.initSliderRevolution()
        }
        
        // Isotope
        if(typeof $.fn.isotope !== 'undefined') {
           _this.initIsotope()
        }

        // hexagon
        if($.fn.hexagonProgress !== 'undefined') {
           _this.initHexagonRating()
        }
        
        
        // navbar collapse
        _this.navbarCollapse()
        
        
        // navbar set to small
        if(!_this.options.navbarSmall) {
            _this.$window.on('scroll', function(e) {
               _this.navbarSize( _this.$window.scrollTop() )
            })
            _this.navbarSize( _this.$window.scrollTop() )
        }
        
        // navbar submenu fix
            // no close submenu if click on child submenu toggle
        _this.navbarSubmenuFix()
        
        
        // toggle search block
        _this.$searchToggle.on('click', function(e) {
            e.preventDefault()
            _this.searchToggle()
        })
        
        
        // close search on ESC press
        _this.$document.on('keyup', function(e) {
            if (e.keyCode == 27) {
                _this.searchToggle('close')
            }
        })
        
        
         // active inputs
         _this.$inputs.on('focus', function() {
            _this.inputsActive( this, true )
         })
         _this.$inputs.on('blur', function() {
            _this.inputsActive( this )
         })
        
        
        // autofocus inputs
        _this.$inputs.filter('[autofocus]:eq(0)').focus()

        // ajax form
        //_this.initAjaxForm()
        
        // accordions
        _this.$accordions.find('.collapse').on('shown.bs.collapse', function() {
            $(this).parent().find('.icon-plus').removeClass('icon-plus').addClass('icon-minus')
            _this.refresh()
        }).on('hidden.bs.collapse', function() {
            $(this).parent().find('.icon-minus').removeClass('icon-minus').addClass('icon-plus')
            _this.refresh()
        })
        
        
         // skrollr init after all plugins
            if(_this.options.parallax && !_this.isMobile && typeof skrollr !== 'undefined') {
                // fix for mobile devices
                // _this.$content.attr('id', 'skrollr-body')

                _this.skrollr = skrollr.init({
                    smoothScrolling: false,
                    forceHeight:false
                })
            }
            
       // some timeout after plugins init
            setTimeout(function() {
                // hide preloader
                _this.$preloader.fadeOut(function() {
                    $(this).find('> *').remove()
                })
            }, 200)
      })
    }
    
    YP.prototype.refresh = function(){
      if(this.skrollr){
        this.skrollr.refresh()
      }
    }
    
   /*------------------------------------------------------------------

      Init Plugins

    -------------------------------------------------------------------*/
    // Owl Carousel
    YP.prototype.initOwlCarousel = function() {
        this.$carousels.each(function() {
            var autoplay = $(this).attr('data-autoplay')
            $(this).owlCarousel({
                loop:true,
                stagePadding: 70,
                nav:true,
                dots: false,
                autoplay: !!autoplay,
                autoplayTimeout: autoplay,
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
        })
        this.$sliders.each(function() {
            var autoplay = $(this).attr('data-autoplay')
            $(this).owlCarousel({
                loop:true,
                nav:false,
                autoplay: autoplay?true:false,
                autoplayTimeout: autoplay,
                autoplaySpeed: 600,
                autoplayHoverPause: true,
                items: 1
            })
        })
        this.$owlCarousel.each(function() {
            var autoplay = $(this).attr('data-autoplay')
            $(this).owlCarousel({
                loop:true,
                dots:true,
                autoplay: !!autoplay,
                autoplayTimeout: autoplay,
                autoplaySpeed: 600,
                autoplayHoverPause: true,
                responsive:{
                    0:{
                        items:3
                    },
                    500:{
                        items:4
                    },
                    992:{
                        items:5
                    },
                    1200:{
                        items:6
                    }
                }
            })
        })
    }

    // Magnific Popup
    YP.prototype.initMagnificPopup = function() {
        var mpOptions = {
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: false,
            mainClass: 'mfp-no-margins mfp-img-mobile mfp-with-fade',
            tLoading: '<div class="preloader"></div>',
            removalDelay: 300,
            image: {
                verticalFit: true,
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        }

        // image popup
        this.$imagePopup.magnificPopup($.extend({
            type: 'image'
        }, mpOptions))

        // video popup
        this.$videoPopup.magnificPopup($.extend({
            type: 'iframe'
        }, mpOptions))

        // gallery popup
        this.$galleryPopup.magnificPopup($.extend({
            delegate: '.owl-item:not(.cloned) a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            callbacks: {
                elementParse: function(item) {
                    // Function will fire for each target element
                    // "item.el" is a target DOM element (if present)
                    // "item.src" is a source that you may modify
                    var video = /youtube.com|youtu.be|vimeo.com/g.test( item.src )

                    if(video) {
                        item.type = 'iframe'
                    } else {
                        item.type = 'image'
                    }

                }
            }
        }, mpOptions))
    }

    // Slider Revolution
    YP.prototype.initSliderRevolution = function() {
        var _this = this
        _this.$revSlider.each(function() {
            var item = $(this)

            // options
            var rsOptions = {
                dottedOverlay:'none',
                // startwidth:1366,
                // startheight:768,
                navigationType:'bullet',
                navigationArrows:'solo',
                navigationStyle:'preview4',
                fullWidth: item.hasClass('rs-fullwidth')?'on':'off',
                fullScreen: item.hasClass('rs-fullscreen')?'on':'off',
                spinner:'spinner4'
            }

            // init
            var slider = item.find('.tp-banner').show().revolution(rsOptions)

            slider.on('revolution.slide.onloaded', function() {
                _this.refresh()
            })
        })
    }

    // Isotope
    YP.prototype.initIsotope = function() {
        var _this = this

        _this.$isotope.each(function() {
            var curIsotope = $(this).find('.isotope-list')
            var curIsotopeOptions = $(this).find('.isotope-options')

            // init items
            curIsotope.isotope({
                layoutMode: 'fitRows',
                itemSelector: '.item'
            })

            // refresh for skrollr
            curIsotope.isotope('on', 'arrangeComplete', function() {
                _this.refresh()
            })
            curIsotope.isotope('on', 'layoutComplete', function() {
                _this.refresh()
            })


            // click on filter button
            curIsotopeOptions.on('click', '> :not(.active)', function(e) {
                $(this).addClass('active').siblings().removeClass('active')
                var curFilter = $(this).attr('data-filter')

                e.preventDefault()

                curIsotope.isotope({
                    filter: function() {
                        if(curFilter === 'all') {
                            return true
                        }

                        var itemFilters = $(this).attr('data-filters')

                        if(itemFilters) {
                            itemFilters = itemFilters.split(',')
                            for(var k in itemFilters) {
                                if(itemFilters[k].replace(/\s/g, '') === curFilter) {
                                    return true
                                }
                            }
                        }
                        return false
                    }
                })
            })
        })

        setTimeout(function(){
            _this.refresh()
        }, 1000)
    }



    /*------------------------------------------------------------------

      Fade Between Pages

    -------------------------------------------------------------------*/
    YP.prototype.fadeBetweenPages = function() {
        // get file name
        function getFileName( url ) {
            return url.replace(/^.*[\\\/]/, '')
        }

        // click on link
        function clickLink(e) {
            e.preventDefault()

            var href = this.href
            _this.$preloader.fadeIn(300, function() {
                window.location.href = href
            })
        }

        var _this = this
        var pageHost = new RegExp( "//" + location.host + "($|/)" )
        var pageHref = new RegExp( location.href )
        var pageFileName = getFileName( location.href )

        // each <a> tag in page
        $('a').each(function() {
            var curHref = this.href
            var curFileName = getFileName( curHref )
            var isLocal = ( curHref.substring(0,4) === "http" ) ? pageHost.test( curHref ) : true

            var isCurrent = curFileName == pageFileName
            var isHTML = /\.html/g.test( curFileName )
            var isHash = /#/g.test( curFileName )

            var isSearchToggle = $(this).is(_this.$searchToggle);

            // when local and not current page link
            if( isLocal && !isCurrent && isHTML && !isHash && !isSearchToggle ) {
                $(this).on('click', clickLink)
            }

            // when current page - prevent page reload
            else if( isCurrent && isHTML && !isHash ) {
                $(this).on('click', function(e) {
                    e.preventDefault()
                })
            }
        })
    }

    /*------------------------------------------------------------------

      Navbar

    -------------------------------------------------------------------*/
    // navbar size
    YP.prototype.navbarSize = function(curTop) {
        if(curTop > this.navbarMaxTop && !this.navbarSmall) {
            this.navbarSmall = true
            this.$navbar.addClass('navbar-small')
        }

        if(curTop <= this.navbarMaxTop && this.navbarSmall) {
            this.navbarSmall = false
            this.$navbar.removeClass('navbar-small')
        }
    }

    // navbar collapse
    YP.prototype.navbarCollapse = function() {
        var _this = this

        _this.$navbarToggleBtn.on('click', function() {
            _this.$navbarToggleTarget.toggleClass('collapse')
        })
    }

    // navbar submenu fix
    // no close submenu if click on child submenu toggle
    YP.prototype.navbarSubmenuFix = function() {
        this.$navbar.on('click', '.dropdown-submenu > a', function(e) {
            e.preventDefault()
            e.stopPropagation()
        })
    }
    
    
      /*------------------------------------------------------------------

      Search Block

    -------------------------------------------------------------------*/
    // toggle search block
    YP.prototype.searchToggle = function(type) {
        var _this = this
        var opened = _this.$searchBlock.hasClass('active')

        // no open when opened and no close when closed
        if( (type == 'close' && !opened) || (type == 'open' && opened) ) {
            return
        }

        // hide
        if( opened ) {
            _this.$searchBlock.removeClass('active')
        }

        // show
        else {
            _this.$searchBlock.addClass('active')
            setTimeout(function() {
                _this.$searchBlock.find('input').focus()
            }, 120)
        }
     }


    /*------------------------------------------------------------------

      Inputs

    -------------------------------------------------------------------*/
    // inputs set active
    YP.prototype.inputsActive = function( item, active ) {
        // activate input
        if( active ) {
            $(item).parent().addClass('input-filled')
        }

        // deactivate input
        else {
            $(item).parent().removeClass('input-filled')
        }
    }


    /*------------------------------------------------------------------

      Init Hexagon Rating

    -------------------------------------------------------------------*/
    YP.prototype.initHexagonRating = function() {
        this.$hexagonRating.each(function() {
            var max = parseFloat($(this).attr('data-max')) || 10
            var cur = parseFloat($(this).text()) || 0
            var size = parseFloat($(this).attr('data-size')) || 120
            var backColor = $(this).attr('data-back-color') || 'rgba(255,255,255,0.1)'
            var frontColor = $(this).attr('data-front-color') || '#fff'

            $(this).css({
                width: size,
                height: size
            }).hexagonProgress({
                value: cur / max,
                size: size,
                animation: false,
                // 60deg + fix (strange error in hexagon plugin)
                //startAngle: parseInt((60 + 000000001) * Math.PI / 180),8),
                startAngle:60,
                lineWidth: 2,
                clip: true,
                lineBackFill: { color: backColor },
                lineFrontFill: { color: frontColor }
            })
        })
    }
    
    
    /*------------------------------------------------------------------

      Init Youplay

    -------------------------------------------------------------------*/
    
    
    
    return new YP( YP.DEFAULT );
  });
	
})(window, navigator, angular, jQuery);