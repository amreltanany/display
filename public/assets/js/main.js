(function () {
	'use strict';

	var reduce = document.documentElement.classList.contains('reduce-motion');
	var header = document.querySelector('.de-header');
	var toggle = document.querySelector('.de-nav-toggle');
	var nav = document.querySelector('.de-nav');
	var overlay = document.querySelector('.de-nav-overlay');
	var toTop = document.querySelector('.de-totop');

	// Header: transparent at the top; past 40% of the first screen it hides on scroll down
	// and comes back (white pill) on scroll up.
	var lastY = window.scrollY;
	var goingUp = false;

	function setScrolled() {
		if (!header) return;
		var y = window.scrollY;
		var scrolled = y > window.innerHeight * 0.4;
		if (scrolled) {
			if (y < lastY - 2) goingUp = true;
			else if (y > lastY + 2) goingUp = false;
		} else {
			goingUp = false;
		}
		lastY = y;
		header.classList.toggle('is-scrolled', scrolled);
		header.classList.toggle('is-up', scrolled && goingUp);
	}

	function setToTop() {
		if (!toTop) return;
		toTop.classList.toggle('is-visible', window.scrollY > 320);
	}

	setScrolled();
	setToTop();
	window.addEventListener(
		'scroll',
		function () {
			setScrolled();
			setToTop();
		},
		{ passive: true }
	);

	function closeMenu() {
		if (!nav || !toggle) return;
		nav.classList.remove('is-open');
		if (header) header.classList.remove('menu-open');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-label', 'Open menu');
		if (overlay) overlay.hidden = true;
		document.body.style.overflow = '';
		if (window.lenis) window.lenis.start();
	}

	function openMenu() {
		if (!nav || !toggle) return;
		nav.classList.add('is-open');
		if (header) header.classList.add('menu-open');
		toggle.setAttribute('aria-expanded', 'true');
		toggle.setAttribute('aria-label', 'Close menu');
		if (overlay) overlay.hidden = false;
		document.body.style.overflow = 'hidden';
		if (window.lenis) window.lenis.stop();
	}

	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			if (nav.classList.contains('is-open')) {
				closeMenu();
			} else {
				openMenu();
			}
		});
	}

	if (overlay) {
		overlay.addEventListener('click', closeMenu);
	}

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') closeMenu();
	});

	if (nav) {
		nav.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				if (window.matchMedia('(max-width: 860px)').matches) closeMenu();
			});
		});
	}

	if (toTop) {
		toTop.addEventListener('click', function () {
			if (window.lenis) window.lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			var id = link.getAttribute('href');
			if (!id || id === '#') return;
			if (id === '#masthead' || id === '#top') {
				event.preventDefault();
				if (window.lenis) window.lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
				return;
			}
			var target = document.querySelector(id);
			if (!target) return;
			event.preventDefault();
			var offset = (header ? header.offsetHeight : 76) + 8;
			var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
			if (window.lenis) window.lenis.scrollTo(Math.max(0, top)); else window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
		});
	});

	// Home hero: layered 3D parallax. A layer that should look like it moves at speed s gets an extra
	// offset of scrollY * (1 - s). Updated synchronously in the scroll handler (no rAF) so it never lags.
	var hero3d = document.querySelector('.de-hero--3d');
	if (hero3d && !reduce) {
		var lay = {
			sky: hero3d.querySelector('.de-layer--sky'),
			letters: hero3d.querySelector('.de-layer--letters'),
			mist: hero3d.querySelector('.de-layer--mist'),
			fg: hero3d.querySelector('.de-layer--fg')
		};
		var set = function (el, y, s) {
			if (!el) return;
			el.style.setProperty('--y', y.toFixed(1) + 'px');
			if (s !== undefined) el.style.setProperty('--s', s.toFixed(4));
		};
		var update3d = function () {
			var y = window.scrollY;
			if (y > hero3d.offsetHeight * 1.15) return; // hero is off screen
			var p = Math.min(y / 900, 1);
			set(lay.sky, y * 0.12);            // 0.88x: the farthest layer
			set(lay.letters, y * 0.26);        // 0.74x: sinks behind the building
			set(lay.mist, -y * 0.1);           // 1.10x: haze in front
			set(lay.fg, -y * 0.05, 1 + 0.08 * (1 - Math.pow(1 - p, 2))); // building: slightly faster + grows toward the viewer
		};
		window.addEventListener('scroll', update3d, { passive: true });
		window.addEventListener('resize', update3d);
		update3d();
	}

	// Lightbox: click a project card to browse all its photos (arrows, keys, swipe, thumbnails).
	var lb = document.querySelector('.de-lb');
	if (lb) {
		var lbImg = lb.querySelector('.de-lb__img');
		var lbThumbs = lb.querySelector('.de-lb__thumbs');
		var lbCount = lb.querySelector('.de-lb__count');
		var lbList = [];
		var lbIdx = 0;
		var lbOpener = null;
		var thumbOf = function (src) { return src.replace(/\.webp/, '-t.webp'); };

		var lbShow = function (i) {
			lbIdx = (i + lbList.length) % lbList.length;
			lbImg.classList.remove('is-in');
			lbImg.src = lbList[lbIdx];
			lbCount.textContent = lbList.length > 1 ? lbIdx + 1 + ' / ' + lbList.length : '';
			lbThumbs.querySelectorAll('button').forEach(function (b, n) {
				b.classList.toggle('is-active', n === lbIdx);
				if (n === lbIdx) b.scrollIntoView({ block: 'nearest', inline: 'center' });
			});
			// preload the neighbours so arrows feel instant
			[lbIdx + 1, lbIdx - 1].forEach(function (n) { if (lbList.length > 1) new Image().src = lbList[(n + lbList.length) % lbList.length]; });
		};
		lbImg.addEventListener('load', function () { lbImg.classList.add('is-in'); });

		var lbOpen = function (card, btn) {
			lbList = JSON.parse(card.getAttribute('data-gallery') || '[]');
			if (!lbList.length) return;
			lbOpener = btn;
			lb.querySelector('.de-lb__title').textContent = card.getAttribute('data-title') || '';
			lb.querySelector('.de-lb__client').textContent = card.getAttribute('data-client') || '';
			lb.querySelector('.de-lb__text').textContent = card.getAttribute('data-text') || '';
			lbImg.alt = card.getAttribute('data-title') || '';
			lbThumbs.innerHTML = '';
			lbThumbs.hidden = lbList.length < 2;
			lb.classList.toggle('is-single', lbList.length < 2);
			lbList.forEach(function (src, n) {
				var t = document.createElement('button');
				t.type = 'button';
				t.setAttribute('aria-label', 'Photo ' + (n + 1));
				t.innerHTML = '<img alt="" loading="lazy" src="' + (src.indexOf('/assets/work/p/') === 0 ? thumbOf(src) : src) + '">';
				t.addEventListener('click', function () { lbShow(n); });
				lbThumbs.appendChild(t);
			});
			lb.hidden = false;
			document.body.style.overflow = 'hidden';
			if (window.lenis) window.lenis.stop();
			lbShow(0);
			lb.querySelector('.de-lb__close').focus();
		};
		var lbClose = function () {
			if (lb.hidden) return;
			lb.hidden = true;
			document.body.style.overflow = '';
			if (window.lenis) window.lenis.start();
			if (lbOpener) lbOpener.focus();
		};

		document.addEventListener('click', function (e) {
			var btn = e.target.closest && e.target.closest('.de-portfolio__open');
			if (btn) { lbOpen(btn.closest('[data-gallery]'), btn); return; }
			if (lb.hidden) return;
			if (e.target.closest('.de-lb__close') || e.target === lb || e.target.classList.contains('de-lb__stage')) lbClose();
			else if (e.target.closest('.de-lb__nav--next')) lbShow(lbIdx + 1);
			else if (e.target.closest('.de-lb__nav--prev')) lbShow(lbIdx - 1);
		});
		document.addEventListener('keydown', function (e) {
			if (lb.hidden) return;
			if (e.key === 'Escape') lbClose();
			else if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
			else if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
		});
		var sx = null;
		lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
		lb.addEventListener('touchend', function (e) {
			if (sx === null) return;
			var dx = e.changedTouches[0].clientX - sx;
			if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
			sx = null;
		}, { passive: true });
	}

	// Portfolio filter chips: show/hide projects by category.
	var filterBtns = document.querySelectorAll('.de-filter');
	if (filterBtns.length) {
		var cards = document.querySelectorAll('[data-portfolio] .de-portfolio__item');
		filterBtns.forEach(function (btn) {
			btn.addEventListener('click', function () {
				var f = btn.getAttribute('data-filter');
				filterBtns.forEach(function (b) {
					b.classList.toggle('is-active', b === btn);
					b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
				});
				cards.forEach(function (card) {
					var show = f === 'all' || card.getAttribute('data-category') === f;
					card.hidden = !show;
					if (!show) return;
					card.classList.add('is-in'); // reveal state must not wait for a stale scroll trigger
					var media = card.querySelector('.de-portfolio__media');
					if (media) media.style.clipPath = 'none';
					card.classList.remove('is-filtering');
					void card.offsetWidth;
					card.classList.add('is-filtering');
				});
				if (window.lenis) window.lenis.resize();
			});
		});
	}

	// Arrow dividers draw themselves once when they scroll into view.
	var arrows = document.querySelectorAll('.de-arrow');
	if (arrows.length) {
		if (reduce || !('IntersectionObserver' in window)) {
			arrows.forEach(function (a) { a.classList.add('is-drawn'); });
		} else {
			var arrowObserver = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-drawn');
							arrowObserver.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.25 }
			);
			arrows.forEach(function (a) { arrowObserver.observe(a); });
		}
	}

	var reveals = document.querySelectorAll('.de-reveal');
	if (!reveals.length) return;

	if (reduce || !('IntersectionObserver' in window)) {
		reveals.forEach(function (el) {
			el.classList.add('is-in');
		});
		return;
	}

	var observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-in');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
	);

	reveals.forEach(function (el) {
		observer.observe(el);
	});
})();
