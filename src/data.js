// All site content lives here. Sources: "Display Egypt Advertising.pdf" (company profile), "Display Booths.pdf",
// "website content.docx", the photo folders (Billboards / Booths / Events) and contact.txt.
const c = (name) => `/assets/clients/${name}.webp?v=1`;

// photos live in /assets/work/p/: NNN.webp (full), NNN-t.webp (card thumbnail), NNN-h.webp (large, for full-width heroes)
const P = (id, v = '') => `/assets/work/p/${id}${v}.webp?v=3`;
export const hero = (id) => P(id, '-h');

export const contact = {
	phone: '+20 10 3694 9949',
	phoneHref: 'https://wa.me/201036949949', // WhatsApp link
	email: 'info@displayegypt.com',
	address: 'Banafseg 1, Villa 232, First Settlement, New Cairo, Egypt',
	social: [
		{ name: 'Facebook', href: 'https://www.facebook.com/DISPLAYEGYPT/', icon: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z' },
		{ name: 'Instagram', href: 'https://www.instagram.com/display.eg', icon: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
		{ name: 'LinkedIn', href: 'https://www.linkedin.com/company/108200015', icon: 'M6.9 8.9H3.7V20h3.2V8.9zM5.3 3.9a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.3 13.7c0-3-1.6-4.9-4.2-4.9-1.4 0-2.3.7-2.8 1.4V8.9h-3.1V20h3.2v-6c0-1.6.5-2.6 1.8-2.6 1.2 0 1.7.9 1.7 2.6V20h3.2v-6.3z' },
		{ name: 'TikTok', href: 'https://www.tiktok.com/@display.eg', icon: 'M16.6 2h-3.1v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.5a5.9 5.9 0 1 0 5 5.8V8.4a7.4 7.4 0 0 0 4.3 1.4V6.7a4.3 4.3 0 0 1-4.3-4.7z' },
	],
};

// Six service cards (home + services page). The three digital/creative cards share one detail page.
export const services = [
	{ title: 'Outdoor Campaigns', short: 'Outdoor', href: '/services/ooh-campaigns/', image: P('001', '-t'), alt: 'Noll billboard on a New Cairo highway', text: 'Static and digital billboards, LED screens, bridge banners, building wraps, and transit ads across Egypt’s most premium locations.' },
	{ title: 'Events & Activations', short: 'Events & Activations', href: '/services/event-management/', image: P('204', '-t'), alt: 'Live concert stage at the Solen North Coast event', text: 'Full event planning, concerts, brand launches, sampling, sponsorships, and beach management, from the first concept to the night itself.' },
	{ title: 'Exhibition Booths & Fabrication', short: 'Exhibition Booths', href: '/services/exhibition-booths/', image: P('009', '-t'), alt: 'GV Investments exhibition booth with gold lighting', text: 'Architectural booth design and in-house fabrication for exhibitions like Cityscape and ICT. One team, no outsourcing.' },
	{ title: 'Digital Advertising', short: 'Digital', href: '/services/digital-creative/#digital', image: '/assets/work/digital-ads.webp?v=1', alt: 'Agrado hair-care digital ad creatives', text: 'Meta, Google, TikTok, Snapchat, and YouTube campaigns, retargeting, and programmatic buying, optimized for real results.' },
	{ title: 'Social Media Management', short: 'Social Media', href: '/services/digital-creative/#social', image: '/assets/work/social-media.webp?v=1', alt: 'Social media posts designed for a North Coast hospitality brand', text: 'Content strategy, community management, influencer marketing, and performance reporting that keep your brand present and engaged.' },
	{ title: 'Branding & Creative', short: 'Branding & Creative', href: '/services/digital-creative/#branding', image: '/assets/work/branding-mockups.webp?v=1', alt: 'Brand identity mockups for a law firm', text: 'Brand identity, campaign concepts, art direction, and Arabic/English copywriting, plus commercial video, motion graphics, and drone shoots.' },
];

// category: outdoor | events | booths | activations | creative.
// images = photo ids shown in the lightbox; the first one is the card cover.
const item = (title, client, category, label, images, alt, text, pos = 'center') => ({
	title, client, category, label, alt, text, pos,
	image: images[0].startsWith('/') ? images[0] : P(images[0], '-t'),
	full: images.map((i) => (i.startsWith('/') ? i : P(i))),
});

export const portfolio = [
	item('Maskoon Developer Event', 'Maskoon Developments', 'events', 'Indoor Event', ['082', '081', '085', '088', '083', '080', '078', '090', '087', '074', '075', '073'], 'Maskoon Developments event stage with light beams', 'A full indoor event organized by Display, reflecting Maskoon’s brand identity, with large stage production and lighting design.'),
	item('Solen North Coast', 'Solen', 'events', 'Live Concert', ['204', '205', '200', '201', '203', '177', '198', '197', '199', '202', '179', '163', '168', '185', '188', '189', '192'], 'Solen North Coast concert stage at night', 'A large concert-style production on the sands of the North Coast, with Storm stage branding. Handled entirely by Display.'),
	item('Mercon Indoor Event', 'Mercon', 'events', 'Indoor Event', ['138', '142', '139', '158', '145', '092', '102', '095', '093', '108'], 'Mercon indoor event with a branded entrance arch and registration area', 'A full indoor event with branded entrance arches and a registration area, in partnership with Riverton and Gewan Hotels & Resorts.', 'center top'),
	item('Mercon Conference', 'Mercon', 'events', 'Corporate Conference', ['136', '149', '152', '155', '156'], 'Mercon conference ballroom with stage and round tables', 'A corporate conference bringing together industry leaders, partners, and clients, with Riverton, Gewan Hotels & Resorts, and El-Tamayuz Kuwaiti Co. branding.'),
	item('Amr Diab at AlDau Strand', 'AlDau Strand Hurghada', 'events', 'Concert Production', ['071', '072'], 'Amr Diab performing with stage flames at AlDau Strand', 'The Amr Diab concert at AlDau Strand, Hurghada.'),
	item('Trivium Square Event', 'Trivium Square', 'events', 'Live Event', ['207', '208'], 'Live band performance at the Trivium Square event', 'A full event handled by Display, with a live band performance setup.', 'center top'),
	item('Ramadan Iftar: Mercon', 'Mercon', 'events', 'Iftar Event', ['209', '210', '211', '212'], 'Mercon Iftar event table setting', 'An Iftar event handled from A to Z: concept planning, venue setup, décor, lighting, and on-ground coordination.'),
	item('Ramadan Iftar: Noll & Kleek', 'Noll & Kleek Developments', 'events', 'Iftar Event', ['213', '214', '215'], 'Noll and Kleek Iftar event by the pool', 'Iftar events with full planning, setup, and execution.'),
	item('Nestlé 100 Years', 'Nestlé', 'events', 'Corporate Milestone', ['043', '063', '064'], 'Nestlé 100 years heritage installation with vintage props', 'A heritage-themed immersive installation at the JW Marriott celebrating a century of Nestlé.'),
	item('Nestlé CEO Visit', 'Nestlé', 'events', 'Corporate Event', ['042', '061', '062', '065'], 'Nestlé ice cream kiosk at the Four Seasons Nile Plaza', 'A branded ice cream kiosk and NIDO / Nestlé displays for the CEO visit at the Four Seasons Hotel at the Nile Plaza.'),
	item('Billion Stars Conference', 'Beyti', 'events', 'Corporate Conference', ['049', '050'], 'Beyti Billion Stars conference with Bitcoin-themed decor', 'A Bitcoin-themed management conference with expansive LED walls and immersive event decor.'),
	item('LG at Cairo Bites', 'LG', 'events', 'Live Experience', ['056', '055', '040'], 'LG Meet the Chef live cooking booth', 'A live cooking demo at Cairo Bites (CFC): a Meet the Chef / Play with Clay branded booth.', 'center 35%'),
	item('SODIC at ICT', 'SODIC', 'booths', 'Exhibition Booth', ['032', '031', '044'], 'SODIC exhibition booth at ICT', 'A sleek, minimalist architectural booth with state-of-the-art display technology.'),
	item('Real Mark at Cityscape', 'Real Mark', 'booths', 'Exhibition Booth', ['068', '067', '045'], 'Real Mark black and white striped exhibition stand', 'A conceptual design for Cityscape: a bold monochrome stand with clean linear lighting.'),
	item('Al Dau at Cityscape', 'Al Dau Development', 'booths', 'Exhibition Booth', ['034', '033', '046'], 'Al Dau Development booth with warm wood-grain design', 'A warm, open-concept booth in natural wood that mirrors the Aldau Strand lifestyle.'),
	item('GV Investments', 'GV', 'booths', 'Exhibition Booth', ['009', '010', '011', '012', '013', '014', '016', '018'], 'GV Investments booth with gold ring lighting', 'From 3D concept to built booth: radiant gold lighting and crisp, minimalist geometry.'),
	item('Johnson & Johnson', 'Johnson & Johnson', 'booths', 'Exhibition Booth', ['053'], 'Johnson & Johnson red circular exhibition booth', 'A bold red circular structure framing the Ultra Vision message.'),
	item('Stopadol', 'Stopadol', 'booths', 'Exhibition Booth', ['070', '069'], 'Stopadol blue and white exhibition booth', 'Dynamic blue and white structures with concentric circular elements.', 'center top'),
	item('Profhilo', 'Profhilo', 'booths', 'Exhibition Booth', ['066'], 'Profhilo exhibition booth', 'Soft radiant lighting, minimalist white geometry, and elegant gold accents.'),
	item('HDB Beach Takeover', 'Housing & Development Bank', 'activations', 'Experiential Outdoor', ['023', '021', '025', '026', '027', '028', '029', '030', '041'], 'HDB branded beach lounge with white umbrellas and flags', 'A beach takeover on the North Coast: a branded beach lounge, flags, and a monumental 3D installation.'),
	item('Jumia Black Friday', 'Jumia', 'activations', 'Brand Activation', ['054', '035'], 'Jumia Black Friday booth and roadshow in a mall', 'A custom branded booth plus a roadshow bus across malls and clubs.', 'center 30%'),
	item('L’Oréal Professional Mporium', 'L’Oréal', 'activations', 'Luxury Brand Experience', ['036', '057', '058'], 'L’Oréal Professional make-up and hair styling bar', 'A make-up and L’Oréal Professional activation at Mporium North Coast, with a hair styling bar and make-up stations.'),
	item('Duracell Mall Activation', 'Duracell', 'activations', 'Shopper Marketing', ['052', '051', '037'], 'Giant Duracell mockups with a branded mascot in a hypermarket', 'A branded mascot and gaming activation in malls and in store, which raised market share by 32% in the first 45 days.', 'center 40%'),
	item('Luna Summer Roadshow', 'Luna', 'activations', 'Summer Pop-Up', ['060', '059', '038'], 'Luna beauty bar and nail bar kiosk on a truck', 'A Beauty Bar / Nail Bar branded kiosk and truck on the North Coast.', 'center 55%'),
	item('Ariel Gel Activation', 'Ariel / P&G', 'activations', 'BTL Activation', ['047', '048', '039'], 'Ariel gel branded kiosk and branded car roadshow', 'A branded kiosk and a branded car roadshow across Cairo’s malls and streets.', 'center 30%'),
	item('Noll Billboards', 'Kleek Developments', 'outdoor', 'Outdoor Campaign', ['001', '002'], 'Noll billboard on a New Cairo highway', 'Premium billboards for NOLL, New Cairo, along the main roads.'),
	item('Riverton Billboards', 'Riverton', 'outdoor', 'Outdoor Campaign', ['003', '004'], 'Riverton billboard above a busy Cairo road', 'High-visibility billboards along Cairo’s busiest corridors.'),
	item('Town Writers: Developing Narratives', 'Town Writers', 'outdoor', 'Outdoor Campaign', ['005', '006'], 'Town Writers Developing Narratives billboard', 'A clean, editorial billboard campaign on a major highway.'),
	item('Notion: A Home, Not a House', 'Town Writers', 'outdoor', 'Outdoor Campaign', ['007', '008'], 'Notion billboard with a yellow headline', 'A bold billboard campaign for Notion, designed to stop traffic.'),
	item('Digital Ad Creatives', 'Agrado', 'creative', 'Digital Advertising', ['/assets/work/digital-ads.webp?v=1'], 'Agrado digital advertising creatives', 'Campaign creatives and social ads for hair-care brands.'),
	item('Brand Identity', 'Law firm', 'creative', 'Branding & Creative', ['/assets/work/branding-mockups.webp?v=1'], 'Brand identity stationery and signage mockups', 'A complete identity, from logo to stationery and signage.'),
	item('Social Media Content', 'North Coast hospitality', 'creative', 'Social Media', ['/assets/work/social-media.webp?v=1'], 'Social media content grid for a beach club', 'A cohesive content grid and community management for a North Coast venue.'),
];

export const homeWork = ['Maskoon Developer Event', 'Solen North Coast', 'SODIC at ICT', 'Duracell Mall Activation', 'HDB Beach Takeover', 'Nestlé 100 Years'];

export const filters = [
	['all', 'All work'],
	['outdoor', 'Outdoor'],
	['events', 'Events'],
	['booths', 'Exhibition booths'],
	['activations', 'Activations'],
	['creative', 'Digital & creative'],
];

// One continuous row, scrolling left
export const clients = [
	['maskoon-developments', 'Maskoon Developments'], ['sodic', 'SODIC'], ['loreal', 'L’Oréal'], ['nestle', 'Nestlé'], ['jumia', 'Jumia'], ['lg', 'LG'],
	['miele', 'Miele'], ['sensodyne', 'Sensodyne'], ['ariel', 'Ariel'], ['duracell', 'Duracell'], ['aldau-development', 'Al Dau Development'], ['kleek-developments', 'Kleek Developments'],
	['noll-new-cairo', 'Noll New Cairo'], ['solen-north-coast', 'Solen North Coast'], ['housing-development-bank', 'Housing & Development Bank'], ['souq', 'Souq.com'], ['mercon', 'Mercon'], ['real-mark', 'Real Mark'],
	['trivium-square', 'Trivium Square'], ['amr-diab', 'Amr Diab'], ['luna', 'Luna'], ['fairy', 'Fairy'], ['mini', 'MINI'], ['faw', 'FAW'],
	['agrado', 'Agrado'], ['amalfi', 'Amalfi'], ['cribs-el-gouna', 'Cribs El Gouna'], ['brinker-international', 'Brinker International'], ['inertia', 'Inertia'], ['hona-radio', 'Hona Radio'],
	['panacea-stars', 'Panacea Stars'], ['emblem-v', 'Client'],
].map(([file, name]) => ({ name, src: c(file) }));

export const stats = [
	{ value: '15+', label: 'Years of presence in Egyptian outdoor and integrated marketing' },
	{ value: '150+', label: 'Satisfied clients across real estate, FMCG, tech, and hospitality' },
	{ value: '90+', label: 'Dedicated team members under one roof' },
	{ value: '10,000 m²', label: 'Production facility, plus 2,000 m² of storage' },
	{ value: '50+', label: 'Events delivered, from launches to large exhibitions' },
	{ value: '100%', label: 'In-house design, fabrication, and execution' },
];
