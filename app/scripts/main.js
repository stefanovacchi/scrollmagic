import * as global from './modules/global.js';

import {scene} from './modules/scenes/scene.js';

export var App = {
  doc: $(document),
  win: $(window)
};

(function ($) {
	// Global Variables
	var $body = $('body'),
		$html = $('html'),
		$btnMenu = $('.js-btn--menu'),
		$btnClose = $('.js-btn--close'),
		$btnScrollTop = $('.js-btn--scroll-to-top'),
		$btnModal = $('.js-btn-modal'),
		$nav = $('.js-nav'),
		$svgSarinaBallons = $('.svgs--sarina-ballons'),
		$sarinaBallons = $('.sarina-ballons'),
		$message = $('.message'),
		$wrapper = $('.wrapper'),
		windowTooSmall = '<p>This website is not supported under <strong>960px window width</strong>.</p>',
		updateBrowser = '<p>You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>',
		browser,
		resizeTimer
		;

	var responsiveDesign = function() {
	    fn.svgResize(2100, 700, $svgSarinaBallons, $sarinaBallons, 7);
	};


	var init = function() {
		scene();

		$btnModal.on('click', function() {
			fn.openModal(this);
		});
		$btnClose.on('click', function(){
			fn.closeModal();
		});
		$btnScrollTop.on('click', function(){
			location.reload();
		});

		responsiveDesign();
	};

	var fn = {
		svgResize: function(width, height, svg, wrapper, steps) {
			var ratio = width/height,
		 	svgHeight = svg.height(),
		 	svgWidth = svg.width(svgHeight * ratio);
		 	
		wrapper.width((svgHeight * ratio)/steps);
		},
		openModal: function(e) {
			$body.addClass('modal-view');
			var $this = $(e),
				dataModal = $this.data('modal'),
				$section = $this.parents('.section')
				;

			console.log(dataModal);
			if ($nav.is(":visible")) {
				$nav.addClass('blur');
			} else {
				$btnClose.show();
				$section.addClass('blur');
			}
			$('.modal').filter('[data-page='+ dataModal +']').show();
		},
		closeModal: function() {
			if ($nav.is(":visible")) {
				$nav.removeClass('blur');
			} else {
				$body.removeClass('modal-view');
				$('.section').removeClass('blur');
			}
			$btnClose.hide();
			$('.modal').hide();
		},

		scrollToTop : function() {
			scrollTo(0,0);
		},

		screenTooSmall: function(){
			$message.empty();
			$wrapper.show();
			setTimeout(function(){
				$body.addClass('load');
			}, 100);
		},

		/**
		 * detect IE
		 * returns version of IE or false, if browser is not Internet Explorer
		 */
		detectIE: function() {
			var ua = window.navigator.userAgent;

			// Test values; Uncomment to check result …

			// IE 10
			// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

			// IE 11
			// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

			// Edge 12 (Spartan)
			// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

			// Edge 13
			// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

			var msie = ua.indexOf('MSIE ');
				if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}

			var trident = ua.indexOf('Trident/');
				if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}

			var edge = ua.indexOf('Edge/');
				if (edge > 0) {
				// Edge (IE 12+) => return version number
				return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
			}

			// other browser
			return false;
		}
	}; 

	// On ready Document initialize
	$(function() {
		// Get IE or Edge browser version
		browser = fn.detectIE();

		if (browser === false || browser >= 12) {
			fn.scrollToTop();
			init();
			fn.screenTooSmall();
		} else {
			$message.html(updateBrowser);
			$wrapper.hide();
		}

		// Add class ie
		if (browser != false || browser >= 12) {
			$html.addClass('ie');
		}
		

		// prevent jumping background on IE
		if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	        $('body').on("mousewheel", function () {
	            // remove default behavior
	            event.preventDefault(); 

	            //scroll without smoothing
	            var wheelDelta = event.wheelDelta;
	            var currentScrollPosition = window.pageYOffset;
	            window.scrollTo(0, currentScrollPosition - wheelDelta);
	        });
		}
		
	});

	// On resize Window
	App.win.on('resize', function(e) {
		responsiveDesign();
		fn.screenTooSmall();
	});

	// On change Orientation
	App.win.on("orientationchange",function(event){
		responsiveDesign();
		fn.screenTooSmall();
	});

	// On before unload 
	App.win.on('beforeunload', function() {
		$wrapper.hide();
	    fn.scrollToTop(); 
	});

})(jQuery);
