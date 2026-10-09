// Smooth (inertial) scrolling with Lenis + GSAP ScrollTrigger reveals.
// Lenis keeps the native scrollbar/position, so the header logic in /assets/js/main.js still works.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const root = document.documentElement;
// set by the inline script in <head>; add ?motion=on to the URL to test with OS "reduce motion" enabled
const reduce = root.classList.contains('reduce-motion');

function init() {
	if (reduce) return; // CSS also skips the hidden start state (html.reduce-motion)

	gsap.registerPlugin(ScrollTrigger);
	if (/[?&]motion=on/.test(location.search)) window.__motion = { gsap, ScrollTrigger }; // debug handle for testing

	const lenis = new Lenis({
		respectReducedMotion: false, // Lenis 1.3+ turns smoothing off by itself when the OS has "reduce motion"; the owner wants it always on
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
	});
	window.lenis = lenis;
	lenis.on('scroll', ScrollTrigger.update);
	const raf = (time) => {
		lenis.raf(time);
		requestAnimationFrame(raf);
	};
	requestAnimationFrame(raf);

	// Clip-path reveal (plays once when the image block enters the viewport).
	// ponytail: only the wrapper is clipped; no inner scale, so the existing hover zoom keeps working.
	gsap.utils
		.toArray('.de-service__media, .de-portfolio__media, .de-about__media, .de-frame')
		.forEach((el) => {
			gsap.fromTo(
				el,
				{ clipPath: 'inset(0 0 100% 0)' },
				{
					clipPath: 'inset(0 0 0% 0)',
					duration: 1.4,
					ease: 'expo.out', // end state stays inline: clearing it would bring back the CSS hidden start state
					scrollTrigger: { trigger: el, start: 'top 88%', once: true },
				}
			);
		});

	// Scrubbed parallax on hero images.
	gsap.utils.toArray('.de-hero__media img, .de-page-hero__media img, .de-cta__media img').forEach((img) => {
		const hero = img.closest('.de-hero, .de-page-hero, .de-cta');
		gsap.fromTo(
			img,
			{ yPercent: -7, scale: 1.14 },
			{
				yPercent: 7,
				ease: 'none',
				scrollTrigger: { trigger: hero, start: hero.classList.contains('de-cta') ? 'top bottom' : 'top top', end: 'bottom top', scrub: true },
			}
		);
	});
}

try {
	init();
} catch (e) {
	// fail soft: never leave images hidden if something breaks
	root.classList.add('no-motion');
	console.warn('motion disabled', e);
}
