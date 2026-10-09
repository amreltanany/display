const a = (p) => `/assets/${p}`;
const u = (p) => `/uploads/${p}`;

export const contact = { email: 'info@displayegypt.com', address: '232 Banafseg 1, New Cairo, Egypt' };

export const services = [
  { title: 'OOH Advertising', href: '/services/ooh-campaigns/', image: a('images/service-ooh.jpg'), alt: 'Roadside outdoor billboard along a Cairo highway at golden hour', text: 'High-impact outdoor campaigns across highways, unipoles, digital screens, and city takeovers — planned, booked, produced, and monitored.' },
  { title: 'Event Management', href: '/services/event-management/', image: a('images/service-events.jpg'), alt: 'Premium corporate event stage with LED screens and dramatic lighting', text: 'End-to-end event production from concept and staging to guest operations, technical setup, and on-the-night execution.' },
  { title: 'Printing', href: '/services/printing/', image: a('images/service-printing.jpg'), alt: 'Large-format printer producing outdoor advertising materials', text: 'Large-format, event, and corporate print with in-house production — billboards, vinyl, POS, and brand collaterals delivered at campaign speed.' },
  { title: 'Creative Services', href: '/our-portfolio/', image: a('images/service-creative.jpg'), alt: 'Creative studio with campaign boards and focused lighting', text: 'Concepting, visual identity, and campaign design built for outdoor media, events, and brand environments that have to work in the real world.' },
  { title: 'Campaign Management', href: '/services/', image: a('images/service-campaigns.jpg'), alt: 'Campaign planning workspace with maps and media layouts', text: 'Strategy, location selection, production, installation, and reporting — one team accountable for the full outdoor and experiential journey.' },
];

export const portfolio = [
  { title: 'Maskoon Developments Launch', category: 'Event Production', image: u('2025/07/1751824461239.jpeg'), alt: 'Maskoon Developments launch event with LED stage, lasers, and live audience' },
  { title: 'Stage Performance Direction', category: 'Event Management', image: u('2025/07/1751824440297.jpeg'), alt: 'Theatrical stage performance at a Maskoon Developments branded corporate event' },
  { title: 'Gala Environment & Lighting', category: 'Event Production', image: u('2025/07/1751824485698.jpeg'), alt: 'Premium gala ballroom with branded LED screens, lounge seating, and lighting rig' },
  { title: 'Exhibition Branding Installation', category: 'Creative Services', image: u('2025/07/1751824486837.jpeg'), alt: 'Three-dimensional exhibition branding blocks for Maskoon Developments and Al-Mahdy Group' },
  { title: 'Digital Outdoor Network', category: 'OOH Advertising', image: a('images/portfolio-digital.jpg'), alt: 'Large digital LED billboard above a Cairo street at night' },
  { title: 'Highway Billboard Network', category: 'OOH Advertising', image: a('images/portfolio-billboard.jpg'), alt: 'Large outdoor billboard structure beside an Egyptian highway at sunset' },
  { title: 'Exhibition Environments', category: 'Events & Branding', image: a('images/portfolio-exhibition.jpg'), alt: 'Sculptural exhibition booth with geometric orange panels and dramatic lighting' },
  { title: 'Print & Promotional Production', category: 'Printing', image: a('images/portfolio-print.jpg'), alt: 'Premium printed promotional materials arranged on a studio table' },
];

export const partners = [
  { name: 'SODIC', src: u('2025/06/Sodic-Developments.jpg') },
  { name: "L'Oréal", src: u('2025/06/LOreal_logo.svg_.png') },
  { name: 'Duracell', src: u('2025/06/Duracell-logo.png') },
  { name: 'El Sewedy Industries', src: u('2025/06/images-2.png') },
  { name: 'Al Dau', src: u('2025/06/aldau.png') },
];

export const img = { a, u };
