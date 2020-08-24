import * as global from '../global.js';

export function scene(){
    // initialise ScrollMagic controller
	let controller = new ScrollMagic.Controller();

	// timeline vars
	var maxSkateInTl = new TimelineLite();
	var bamTl = new TimelineLite();
	var maxSkateOutTl = new TimelineLite();
	var sarinaTl = new TimelineLite();

	// elemenmt vars
	var $maxAndSkateboard = $('.js-max-and-skateboard'),
		$svgsMaxSkateIn = $('.js-svgs--max-skate-in'),
		$bubble = $('.js-bubble'),
		$sceneTextStreet = $('.js-scene__text--street'),
		$textBallonMax = $('.js-text-ballon--max'),
		$closeUpDatenVolumen = $('.js-close-up--daten-volumen'),
		$lanternVg = $('.js-lantern-vg'),
		$beckiAndLantern = $('.js-becki-and-lantern'),
		$maxSkateIn = $('.js-max-skate--in'),
		$maxAndTweets = $('.js-max-aua-and-tweets'),
		$bam = $('.js-bam'),
		$skateboard = $('.js-skateboard'),
		$closeUpBrokenPhone = $('.js-close-up--broken-phone'),
		$svgsBeckiLantern = $('.js-svgs--becki-lantern'),
		$maxSkateOut = $('.js-max-skate--out'),
		$svgsMaxSkateOut = $('.js-svgs--max-skate-out'),
		$useMaxSkateIn = $('.js-use-max-skate-in'),
		$useMaxSkateSad = $('.js-use-max-skate-in--sad')
		;

	var $svgsBeckiLantern = $('.js-svgs--sarina-ballons'),
		text01 = 'upsss!!! ma che succede!?',
		text02 = 'sto volando...',
		text03 = '... YIPPEE!!!'
		;


	sarinaTl
		.fromTo($svgsBeckiLantern, 1, {x: '0%'}, {x: '-71.42%', ease: SteppedEase.config(5)})
		.to('.js-text-ballon', 0.3, {scale: 1}, 0)
		.to('.js-scene__text', 0, {autoAlpha: 0}, 0.3)
		.call(function(){ fn.updateBallonText(text01); })
		.call(function(){ fn.updateBallonText(text02); })
		.to('.js-scene-bg--scene', 1, {y: '100%'}, 'fly')
		.to('.js-tree', 3, {y: '100%'}, 'fly')
		.to('.js-sarina-and-ballons', 1, {x: 20}, 'fly')
		.from('.js-cloud-big', 3, {x: -(global.windowW)}, 'fly')
		.fromTo('.js-cloud-medium', 3, {x: '-100%'}, {x: '100%'}, 'fly')
		.fromTo('.js-cloud-small', 2, {x: '-100%'}, {x: '100%'}, 'fly+=0.5')
		.add(function(){ fn.updateBallonText(text03); }, 'happy-=1')
		.to($svgsBeckiLantern, 1, {x: '-85.7%', ease: SteppedEase.config(1)}, 'happy-=1.5')
		.from('.js-happy-birthday', 1, {y: '-100%'}, 'happy-=1.5')
		.to('.js-btn-modal', 1, {autoAlpha: 1}, 'happy-=1.5')
		;

	//-- build scenes --//
	// functions
	let fn = {
		updateBallonText: function(content){
			$('.js-text-ballon').find('p').text(content);
		},
	};

	// pin the Street container
	var pinStreetScene = new ScrollMagic.Scene({
		triggerElement: '#pin',
		triggerHook: 0,
		duration: '800%'
	})
	.setPin('#pin')
	.setTween(sarinaTl)
	.addTo(controller);

}