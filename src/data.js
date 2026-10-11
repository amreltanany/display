// All site content lives here. Sources: "Display Egypt Advertising.pdf" (company profile),
// "Display Booths.pdf" (booths & activations) and contact.txt.
const w = (name) => `/assets/work/${name}.webp?v=1`;
const c = (name) => `/assets/clients/${name}.webp?v=1`;

export const contact = {
	phone: '+20 10 3694 9949',
	phoneHref: 'tel:+201036949949',
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
	{ title: 'Outdoor Campaigns', href: '/services/ooh-campaigns/', image: w('outdoor-noll-kleek'), alt: 'Large Noll and Kleek Developments billboard above a New Cairo street', text: 'Billboards, LED screens, building wraps, and transit ads across Egypt’s most premium locations — South 90, 6th October Bridge, Nasr City, and the Ring Road.' },
	{ title: 'Events & Activations', href: '/services/event-management/', image: w('event-maskoon'), alt: 'Maskoon Developments indoor event with LED screen and light beams', text: 'Full event planning, concerts, brand launches, and on-ground activations — from the first concept to the night itself.' },
	{ title: 'Exhibition Booths & Fabrication', href: '/services/exhibition-booths/', image: w('gv-booth'), alt: 'GV Investments exhibition booth with gold lighting at Cityscape', text: 'Architectural booth design and in-house fabrication for exhibitions like Cityscape and ICT. One team, no outsourcing.' },
	{ title: 'Digital Advertising', href: '/services/digital-creative/#digital', image: w('digital-ads'), alt: 'Agrado hair-care digital ad creatives', text: 'Meta, Google, TikTok, and YouTube campaigns planned, targeted, and optimized for real results.' },
	{ title: 'Social Media Management', href: '/services/digital-creative/#social', image: w('social-media'), alt: 'Social media posts designed for a North Coast hospitality brand', text: 'Content strategy, community management, and performance reporting that keep your brand present and engaged.' },
	{ title: 'Branding & Creative', href: '/services/digital-creative/#branding', image: w('branding-mockups'), alt: 'Brand identity mockups for a law firm', text: 'Brand identity, campaign concepts, art direction, and copywriting — plus commercial video, motion graphics, and drone shoots.' },
];

// category: outdoor | events | booths | activations | creative
export const portfolio = [
	{ title: 'SODIC at ICT', client: 'SODIC', category: 'booths', label: 'Exhibition Booth', image: w('sodic-ict-booth'), alt: 'SODIC exhibition booth at ICT', text: 'A sleek, minimalist architectural booth with state-of-the-art display technology, built to mirror SODIC’s reputation for urban excellence.' },
	{ title: 'Jumia Black Friday', client: 'Jumia', category: 'activations', label: 'Brand Activation', image: w('jumia-black-friday'), alt: 'Jumia Black Friday activation in a mall', text: 'A Black Friday activation and roadshow across malls and clubs in Egypt.' },
	{ title: 'L’Oréal Professional Mporium', client: 'L’Oréal', category: 'activations', label: 'Luxury Brand Experience', image: w('loreal-mporium'), alt: 'L’Oréal Professional make-up pop-up on the North Coast', text: 'A Hollywood-inspired beauty destination on the North Coast, with curved vanity bars and a premium product theater.' },
	{ title: 'Duracell Mall Activation', client: 'Duracell', category: 'activations', label: 'Shopper Marketing', image: w('duracell-mall'), alt: 'Giant Duracell mockups in a hypermarket', text: 'Giant mockups and live gaming challenges in hypermarkets. The campaign raised market share by 32% within 45 days.' },
	{ title: 'HDB Beach Takeover', client: 'Housing & Development Bank', category: 'activations', label: 'Experiential Outdoor', image: w('hdb-beach'), alt: 'HDB branded beach installation on the North Coast', text: 'A monumental 3D brand installation planted on the sands of the North Coast.' },
	{ title: 'Nestlé 100 Years', client: 'Nestlé', category: 'events', label: 'Corporate Milestone', image: w('nestle-100-years'), alt: 'Nestlé 100 years anniversary set at JW Marriott Cairo', text: 'Projection mapping, a custom dome activation, and bespoke ice cream kiosks at the JW Marriott.' },
	{ title: 'Billion Stars Conference', client: 'Beyti', category: 'events', label: 'Corporate Conference', image: w('beyti-billion-stars'), alt: 'Beyti Billion Stars conference table setting', text: 'A red-carpet management conference with expansive LED walls and precision stage design.' },
	{ title: 'Amr Diab at AlDau Strand', client: 'AlDau Strand', category: 'events', label: 'Concert Production', image: w('event-amr-diab'), alt: 'Amr Diab performing with stage flames at AlDau Strand Hurghada', text: 'Full concert production at AlDau Strand, Hurghada.' },
	{ title: 'Maskoon Developer Event', client: 'Maskoon Developments', category: 'events', label: 'Developer Event', image: w('event-maskoon'), alt: 'Maskoon indoor event stage with light beams', text: 'A full indoor event, from setup to showtime, that reflected Maskoon’s brand identity.' },
	{ title: 'Solen North Coast Event', client: 'Solen', category: 'events', label: 'Live Event', image: w('event-solen'), alt: 'Live performance at the Solen North Coast event', text: 'The entire Solen event handled by Display, with smooth execution and a setup that reflected the brand.' },
	{ title: 'Al Dau at Cityscape', client: 'Al Dau', category: 'booths', label: 'Exhibition Booth', image: w('aldau-booth'), alt: 'Al Dau Development booth with wood-grain design at Cityscape', text: 'A warm, open-concept booth in rich natural wood that mirrors the Aldau Strand lifestyle.' },
	{ title: 'Real Mark at Cityscape', client: 'Real Mark', category: 'booths', label: 'Exhibition Booth', image: w('real-mark-booth'), alt: 'Real Mark black and white striped exhibition stand', text: 'A bold monochrome stand with clean linear lighting and organic accents.' },
	{ title: 'GV Investments', client: 'GV', category: 'booths', label: 'Exhibition Booth', image: w('gv-booth-night'), alt: 'GV Investments booth with gold ring lighting', text: 'A high-end booth with radiant gold lighting and crisp, minimalist geometry.' },
	{ title: 'Johnson & Johnson', client: 'Johnson & Johnson', category: 'booths', label: 'Exhibition Booth', image: w('jnj-booth'), alt: 'Johnson & Johnson red circular exhibition booth', text: 'A bold red circular structure framing the Ultra Vision message.' },
	{ title: 'Stopadol', client: 'Stopadol', category: 'booths', label: 'Exhibition Booth', image: w('stopadol-booth'), alt: 'Stopadol blue and white exhibition booth', text: 'Dynamic blue and white structures with concentric circular elements.' },
	{ title: 'Profhilo', client: 'Profhilo', category: 'booths', label: 'Exhibition Booth', image: w('profhilo-booth'), alt: 'Profhilo exhibition booth with white geometry and gold accents', text: 'Soft radiant lighting, minimalist white geometry, and elegant gold accents.' },
	{ title: 'Luna Summer Roadshow', client: 'Luna', category: 'activations', label: 'Summer Pop-Up', image: w('luna-roadshow'), alt: 'Luna illuminated pop-up on the North Coast at night', text: 'An illuminated pop-up that drew crowds on the North Coast and converted footfall into sales.' },
	{ title: 'Ariel Gel Activation', client: 'Ariel / P&G', category: 'activations', label: 'BTL Activation', image: w('ariel-gel'), alt: 'Ariel gel activation with brand promoters in a Cairo mall', text: 'Hands-on product demonstrations across Cairo’s busiest malls and streets.' },
	{ title: 'LG at Cairo Bites', client: 'LG', category: 'events', label: 'Live Experience', image: w('lg-cairo-bites'), alt: 'LG live cooking station at Cairo Bites', text: 'An open-air premium kitchen where home appliances became the stars of a live culinary performance.' },
	{ title: 'Noll × Kleek Billboard', client: 'Noll & Kleek Developments', category: 'outdoor', label: 'Outdoor Campaign', image: w('outdoor-noll-kleek'), alt: 'Noll and Kleek billboard in New Cairo', text: 'Premium billboards across New Cairo for two developer brands.' },
	{ title: 'Maskoon Billboards', client: 'Maskoon Developments', category: 'outdoor', label: 'Outdoor Campaign', image: w('outdoor-maskoon'), alt: 'Maskoon billboard above a busy junction', text: 'High-visibility placements on Cairo’s busiest junctions.' },
	{ title: 'Night LED Screens', client: 'Outdoor network', category: 'outdoor', label: 'Digital Outdoor', image: w('outdoor-night-led'), alt: 'Illuminated LED screens on a pole at night beside the highway', text: 'LED screens that keep the brand on air after dark.' },
	{ title: 'Digital Ad Creatives', client: 'Agrado', category: 'creative', label: 'Digital Advertising', image: w('digital-ads'), alt: 'Agrado digital advertising creatives', text: 'Campaign creatives and social ads for hair-care brands.' },
	{ title: 'Brand Identity', client: 'Law firm', category: 'creative', label: 'Branding & Creative', image: w('branding-mockups'), alt: 'Brand identity stationery and signage mockups', text: 'A complete identity, from logo to stationery and signage.' },
	{ title: 'Social Media Content', client: 'North Coast hospitality', category: 'creative', label: 'Social Media', image: w('social-media'), alt: 'Social media content grid for a beach club', text: 'A cohesive content grid and community management for a North Coast venue.' },
];

export const homeWork = ['SODIC at ICT', 'Jumia Black Friday', 'L’Oréal Professional Mporium', 'Duracell Mall Activation', 'HDB Beach Takeover', 'Nestlé 100 Years'];

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
