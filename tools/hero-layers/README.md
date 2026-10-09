# Hero layers generator

Splits `hero-source.jpg` (building + giant DISPLAY lettering) into the 3 layers used by the 3D scroll hero:
`hero-sky.jpg`, `hero-letters.webp`, `hero-fg.webp` (copy them to `public/assets/images/`, then bump `?v=` in `src/pages/index.astro`).

Needs Chrome and `puppeteer-core` (`npm i puppeteer-core` in this folder). Run from this folder:

    node layers.mjs out        # writes out/hero-*.{jpg,webp,png}
    node sheet.mjs out         # writes out/sheet.png to eyeball the layers

Tuning knobs inside layers.mjs: `SKY_DARK` (sky brightness), `HORIZON`, the colour thresholds near `raw[i] = 1`.
