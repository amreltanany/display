// Splits the flat hero photo into 3 layers by colour: sky plate (no letters/building), DISPLAY letters, building+ground.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const OUT = process.argv[2] || '.';
const src = 'data:image/jpeg;base64,' + fs.readFileSync('hero-source.jpg').toString('base64');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent('<canvas id=c></canvas>');

const res = await page.evaluate(async ({ src }) => {
	const img = new Image(); img.src = src; await img.decode();
	const W = img.width, H = img.height, N = W * H;
	const c = document.getElementById('c'); c.width = W; c.height = H;
	const g = c.getContext('2d', { willReadFrequently: true });
	g.drawImage(img, 0, 0);
	const src32 = g.getImageData(0, 0, W, H).data;

	const HORIZON = 853;
	const L = new Float32Array(N), BR = new Float32Array(N);
	for (let i = 0; i < N; i++) {
		const r = src32[i * 4], gg = src32[i * 4 + 1], b = src32[i * 4 + 2];
		L[i] = 0.3 * r + 0.59 * gg + 0.11 * b;
		BR[i] = b - r;
	}

	// 1) raw "backdrop" (sky or letters) by colour: bluish-grey or pale-grey, above the horizon
	const raw = new Uint8Array(N);
	for (let y = 0; y < HORIZON; y++) for (let x = 0; x < W; x++) {
		const i = y * W + x;
		const inRoofZone = y < 400 && x >= 560 && x < 1700;
		if (inRoofZone) { if ((BR[i] >= 18 && BR[i] <= 38 && L[i] >= 42) || (BR[i] >= 7 && L[i] >= 175)) raw[i] = 1; }
		else if (BR[i] >= 7 && BR[i] <= 38 && L[i] >= 42) raw[i] = 1;
	}

	// 2) keep only the backdrop connected to the image border (enclosed glass reflections stay "building")
	const B = new Uint8Array(N);
	const stack = new Int32Array(N); let sp = 0;
	const push = (i) => { if (raw[i] && !B[i]) { B[i] = 1; stack[sp++] = i; } };
	for (let x = 0; x < W; x++) push(x);
	for (let y = 0; y < HORIZON; y++) { push(y * W); push(y * W + W - 1); }
	while (sp) {
		const i = stack[--sp]; const x = i % W, y = (i / W) | 0;
		if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < HORIZON - 1) push(i + W);
	}

	// 2-pre) majority smoothing of the mask above the horizon (kills pixel-level jaggies on edges)
	{
		const out = new Uint8Array(N);
		for (let pass = 0; pass < 3; pass++) {
			for (let y = 2; y < HORIZON - 2; y++) for (let x = 2; x < W - 2; x++) {
				let sum = 0;
				for (let dy = -2; dy <= 2; dy++) { const o = (y + dy) * W + x; sum += B[o - 2] + B[o - 1] + B[o] + B[o + 1] + B[o + 2]; }
				const inRoofZone = y < 400 && x >= 560 && x < 1700; // already split crisply by brightness there
				out[y * W + x] = inRoofZone ? B[y * W + x] : (sum >= 13 ? 1 : 0);
			}
			for (let y = 2; y < HORIZON - 2; y++) for (let x = 2; x < W - 2; x++) B[y * W + x] = out[y * W + x];
		}
	}

	// 2a) manual patch: one small window slot in the right tower was read as sky (it is inside the building)
	for (let y = 560; y < 700; y++) for (let x = 1585; x < 1630; x++) B[y * W + x] = 0;

	// 2b) drop small non-backdrop specks (cloud highlights) and keep only big building parts
	{
		const seen = new Uint8Array(N); const st = new Int32Array(N);
		for (let s0 = 0; s0 < HORIZON * W; s0++) {
			if (B[s0] || seen[s0]) continue;
			let top = 0, area = 0; st[top++] = s0; seen[s0] = 1; const members = [];
			while (top) {
				const i = st[--top]; area++; members.push(i); const x = i % W, y = (i / W) | 0;
				const nb = [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < HORIZON - 1 ? i + W : -1];
				for (const j of nb) if (j >= 0 && !B[j] && !seen[j]) { seen[j] = 1; st[top++] = j; }
			}
			if (area < 5000) for (const i of members) B[i] = 1;
		}
	}

	// 3) building alpha: 1 - eroded backdrop, softened 1px; ground is solid below the horizon (feathered over the haze)
	const Be = new Uint8Array(N);
	for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
		const i = y * W + x;
		Be[i] = B[i] && B[i - 1] && B[i + 1] && B[i - W] && B[i + W] && B[i - W - 1] && B[i - W + 1] && B[i + W - 1] && B[i + W + 1] ? 1 : 0;
	}
	// smooth, antialiased building alpha: blur the binary mask (two box passes) and re-sharpen with a smoothstep.
	// Straight roof edges stay straight and pixel noise from the colour classification disappears.
	const boxBlur = (arr, r) => {
		const tmp = new Float32Array(N), out = new Float32Array(N);
		for (let y = 0; y < H; y++) { let sum = 0; for (let k = -r; k <= r; k++) sum += arr[y * W + Math.min(W - 1, Math.max(0, k))];
			for (let x = 0; x < W; x++) { tmp[y * W + x] = sum / (2 * r + 1); sum += arr[y * W + Math.min(W - 1, x + r + 1)] - arr[y * W + Math.max(0, x - r)]; } }
		for (let x = 0; x < W; x++) { let sum = 0; for (let k = -r; k <= r; k++) sum += tmp[Math.min(H - 1, Math.max(0, k)) * W + x];
			for (let y = 0; y < H; y++) { out[y * W + x] = sum / (2 * r + 1); sum += tmp[Math.min(H - 1, y + r + 1) * W + x] - tmp[Math.max(0, y - r) * W + x]; } }
		return out;
	};
	const nbF = new Float32Array(N);
	for (let i = 0; i < N; i++) nbF[i] = B[i] ? 0 : 1;
	const nbBlur = boxBlur(boxBlur(nbF, 1), 2);
	const nbBlurWide = boxBlur(boxBlur(nbF, 3), 4); // stronger smoothing for the long, mostly straight roof edges
	const ssm = (e0, e1, v) => { const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
	const bA = new Float32Array(N);
	for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
		const i = y * W + x;
		const roofZone = y < 400 && x >= 560 && x < 1700;
		let a = roofZone ? ssm(0.4, 0.6, nbBlurWide[i]) : ssm(0.3, 0.8, nbBlur[i]);
		if (y >= 858) a = 1; else if (y >= 846) a = Math.max(a, (y - 846) / 12);
		if (y < 846 && (y < 2 || x < 2 || x >= W - 2)) a = 0;
		bA[i] = a;
	}

	// 4) letters: backdrop pixels that are pale
	const smooth = (e0, e1, v) => { const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
	const lA = new Float32Array(N);
	for (let i = 0; i < N; i++) if (B[i] && (i / W | 0) < 720) lA[i] = smooth(100, 140, L[i]);

	// 4b) keep only large letter shapes
	{
		const seen = new Uint8Array(N), st = new Int32Array(N);
		for (let s0 = 0; s0 < N; s0++) {
			if (lA[s0] <= 0.5 || seen[s0]) continue;
			let top = 0; const members = []; st[top++] = s0; seen[s0] = 1;
			while (top) {
				const i = st[--top]; members.push(i); const x = i % W, y = (i / W) | 0;
				const nb = [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1];
				for (const j of nb) if (j >= 0 && lA[j] > 0.5 && !seen[j]) { seen[j] = 1; st[top++] = j; }
			}
			if (members.length < 4000) for (const i of members) lA[i] = 0;
		}
	}

	// 4c) faint cloud smudges (low alpha) around removed specks: keep only alpha near the large letter shapes
	{
		let keep = new Uint8Array(N);
		for (let i = 0; i < N; i++) keep[i] = lA[i] > 0.5 ? 1 : 0;
		for (let pass = 0; pass < 3; pass++) {
			const nxt = new Uint8Array(N);
			for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; nxt[i] = keep[i] || keep[i - 1] || keep[i + 1] || keep[i - W] || keep[i + W] ? 1 : 0; }
			keep = nxt;
		}
		for (let i = 0; i < N; i++) if (!keep[i]) lA[i] = 0;
	}

	// 5) sky plate: keep real sky pixels, rebuild letters/building area with normalised convolution
	const isSky = new Uint8Array(N);
	for (let i = 0; i < N; i++) if (B[i] && lA[i] < 0.02) isSky[i] = 1;
	const blur = (arr, r) => { // 3 box passes ~ gaussian, separable
		const tmp = new Float32Array(N), out = Float32Array.from(arr);
		const pass = (src, dst, horiz) => {
			const len = horiz ? W : H, lines = horiz ? H : W;
			for (let l = 0; l < lines; l++) {
				let sum = 0; const get = (k) => src[horiz ? l * W + k : k * W + l];
				const set = (k, v) => { dst[horiz ? l * W + k : k * W + l] = v; };
				for (let k = -r; k <= r; k++) sum += get(Math.min(len - 1, Math.max(0, k)));
				for (let k = 0; k < len; k++) {
					set(k, sum / (2 * r + 1));
					sum += get(Math.min(len - 1, k + r + 1)) - get(Math.max(0, k - r));
				}
			}
		};
		for (let p = 0; p < 3; p++) { pass(out, tmp, true); pass(tmp, out, false); }
		return out;
	};
	const ch = [0, 1, 2].map((k) => { const a = new Float32Array(N); for (let i = 0; i < N; i++) a[i] = isSky[i] ? src32[i * 4 + k] : 0; return a; });
	const wArr = Float32Array.from(isSky);
	const fillAt = (r) => { const w = blur(wArr, r); return { w, c: ch.map((a) => blur(a, r)) }; };
	const f1 = fillAt(45), f2 = fillAt(170);

	// grain so the rebuilt area does not look plastic
	let seed = 12345; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 - 0.5; };

	const skyF = [new Float32Array(N), new Float32Array(N), new Float32Array(N)];
	for (let i = 0; i < N; i++) {
		let rgb;
		if (isSky[i]) rgb = [src32[i * 4], src32[i * 4 + 1], src32[i * 4 + 2]];
		else {
			const use1 = f1.w[i] > 0.03;
			const f = use1 ? f1 : f2; const w = Math.max(f.w[i], 1e-4);
			const n = rnd() * 5;
			rgb = [f.c[0][i] / w + n, f.c[1][i] / w + n, f.c[2][i] / w + n];
		}
		skyF[0][i] = rgb[0]; skyF[1][i] = rgb[1]; skyF[2][i] = rgb[2];
	}
	// below the horizon the plate just continues the haze colour (it is hidden by the ground, but must not be black)
	for (let y = 846; y < H; y++) for (let x = 0; x < W; x++) for (let k = 0; k < 3; k++) skyF[k][y * W + x] = skyF[k][845 * W + x];
	const skyB = skyF.map((a) => blur(a, 10)); // blur everything: no visible seam between real sky and rebuilt areas
	const sky = new Uint8ClampedArray(N * 4);
	const SKY_DARK = 0.6; // owner wants a darker background behind the red logo
	for (let i = 0; i < N; i++) { const n = rnd() * 3; sky[i * 4] = skyB[0][i] * SKY_DARK + n; sky[i * 4 + 1] = skyB[1][i] * SKY_DARK + n; sky[i * 4 + 2] = skyB[2][i] * SKY_DARK + n; sky[i * 4 + 3] = 255; }

	// core = building pixels at least 3px away from any backdrop pixel
	const core = new Uint8Array(N);
	{
		let cur = Uint8Array.from(Be);
		for (let pass = 0; pass < 3; pass++) {
			const nxt = new Uint8Array(N);
			for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
				const i = y * W + x;
				nxt[i] = cur[i] && cur[i - 1] && cur[i + 1] && cur[i - W] && cur[i + W] ? 1 : 0;
			}
			cur = nxt;
		}
		// Be is 1 for backdrop; building core is the opposite
		for (let i = 0; i < N; i++) core[i] = 0;
	}
	const bld = new Uint8Array(N); // 1 where the pixel is solidly building
	for (let i = 0; i < N; i++) bld[i] = B[i] ? 0 : 1;
	const bldCore = new Uint8Array(N);
	{
		let cur = Uint8Array.from(bld);
		for (let pass = 0; pass < 3; pass++) {
			const nxt = new Uint8Array(N);
			for (let y = 1; y < HORIZON; y++) for (let x = 1; x < W - 1; x++) {
				const i = y * W + x;
				nxt[i] = cur[i] && cur[i - 1] && cur[i + 1] && cur[i - W] && cur[i + W] ? 1 : 0;
			}
			cur = nxt;
		}
		bldCore.set(cur);
	}
	const srcFg = new Uint8ClampedArray(src32);
	for (let y = 6; y < 846; y++) for (let x = 6; x < W - 6; x++) {
		const i = y * W + x;
		if (bldCore[i] || bA[i] <= 0) continue; // only the soft edge band is repainted
		let r = 0, g2 = 0, b2 = 0, n = 0;
		for (let dy = -6; dy <= 6; dy++) for (let dx = -6; dx <= 6; dx++) { const j = (y + dy) * W + x + dx; if (bldCore[j]) { r += src32[j * 4]; g2 += src32[j * 4 + 1]; b2 += src32[j * 4 + 2]; n++; } }
		if (n > 6) { srcFg[i * 4] = r / n; srcFg[i * 4 + 1] = g2 / n; srcFg[i * 4 + 2] = b2 / n; }
	}

	const letters = new Uint8ClampedArray(N * 4), fg = new Uint8ClampedArray(N * 4);
	for (let i = 0; i < N; i++) {
		let la = lA[i], ba = bA[i];
		if (la < 0.05) la = 0; if (ba < 0.05) ba = 0; if (ba > 0.97) ba = 1; if (la > 0.97) la = 1;
		for (let k = 0; k < 3; k++) {
			const o = src32[i * 4 + k], base = sky[i * 4 + k];
			// choose layer colours so that (fg over (letters over sky)) == original wherever alpha is partial
			const behindFg = la ? Math.min(255, Math.max(0, (la < 1 ? (la * 0 + o) : o))) : base;
			const cLetter = la > 0 && la < 1 ? Math.min(255, Math.max(0, (o - (1 - la) * base) / la)) : o;
			const under = la ? la * cLetter + (1 - la) * base : base;
			const oFg = srcFg[i * 4 + k];
			const cFg = oFg;
			letters[i * 4 + k] = cLetter; fg[i * 4 + k] = cFg; void behindFg;
		}
		letters[i * 4 + 3] = Math.round(la * 255);
		fg[i * 4 + 3] = Math.round(ba * 255);
	}

	// 6) composite at rest vs original (quality check)
	let diff = 0, cnt = 0, worst = 0;
	for (let i = 0; i < N; i += 7) {
		const la = letters[i * 4 + 3] / 255, ba = fg[i * 4 + 3] / 255;
		for (let k = 0; k < 3; k++) {
			const base = sky[i * 4 + k];
			const withLetters = la * letters[i * 4 + k] + (1 - la) * base;
			const out = ba * fg[i * 4 + k] + (1 - ba) * withLetters;
			const d = Math.abs(out - src32[i * 4 + k]); diff += d; cnt++; if (d > worst) worst = d;
		}
	}

	const toData = async (arr, mime, q) => {
		const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
		const gg = cv.getContext('2d'); gg.putImageData(new ImageData(arr, W, H), 0, 0);
		return cv.toDataURL(mime, q).split(',')[1];
	};
	return {
		W, H, meanAbsDiff: +(diff / cnt).toFixed(2), worst: Math.round(worst),
		backdropPct: +(100 * B.reduce((a, b) => a + b, 0) / N).toFixed(1),
		sky: await toData(sky, 'image/jpeg', 0.82),
		letters: await toData(letters, 'image/webp', 0.9),
		fg: await toData(fg, 'image/webp', 0.9),
		lettersPng: await toData(letters, 'image/png'),
		fgPng: await toData(fg, 'image/png'),
	};
}, { src });

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/hero-sky.jpg`, Buffer.from(res.sky, 'base64'));
fs.writeFileSync(`${OUT}/hero-letters.webp`, Buffer.from(res.letters, 'base64'));
fs.writeFileSync(`${OUT}/hero-fg.webp`, Buffer.from(res.fg, 'base64'));
fs.writeFileSync(`${OUT}/hero-letters.png`, Buffer.from(res.lettersPng, 'base64'));
fs.writeFileSync(`${OUT}/hero-fg.png`, Buffer.from(res.fgPng, 'base64'));
console.log(JSON.stringify({ W: res.W, H: res.H, meanAbsDiff: res.meanAbsDiff, worst: res.worst, backdropPct: res.backdropPct }));
for (const f of fs.readdirSync(OUT)) console.log(f, fs.statSync(`${OUT}/${f}`).size);
await browser.close();
