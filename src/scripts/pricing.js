// Pricing page: billing period toggle, plan prices, and the custom plan calculator.
// All rates are approximate placeholders (EGP / month).
const cfg = JSON.parse(document.getElementById('pr-cfg').textContent);
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const round100 = (n) => Math.round(n / 100) * 100;
let period = cfg.periods[0];

const RATES = {
  social: { label: 'Social media', f: (v) => 3000 + v.platforms * 1500 + v.posts * 250 + v.reels * 900,
    desc: (v) => `${v.platforms} platforms, ${v.posts} posts, ${v.reels} Reels` },
  ads: { label: 'Paid ads management', f: (v) => v.platforms * 2000 + v.budget * 0.1,
    desc: (v) => `${v.platforms} platforms, ad budget EGP ${fmt(v.budget)}` },
  content: { label: 'Photo and video', f: (v) => v.shoots * 6000, desc: (v) => `${v.shoots} shoot day${v.shoots > 1 ? 's' : ''}` },
  influencer: { label: 'Influencers', f: (v) => v.count * 1500, desc: (v) => `${v.count} per month` },
  seo: { label: 'SEO and Google profile', f: () => 7000, desc: () => 'Monthly' },
  auto: { label: 'Email and WhatsApp automation', f: () => 5000, desc: () => 'Monthly' },
};
const ADDS = { dash: ['Live dashboard', 2000], am: ['Account manager', 4000] };
const bundleOff = (n) => (n >= 4 ? 0.15 : n === 3 ? 0.1 : n === 2 ? 0.05 : 0);
const billText = (perMonth) => (period.months === 1 ? 'Billed monthly' : `Billed EGP ${fmt(perMonth * period.months)} every ${period.months === 12 ? 'year' : period.months + ' months'}${period.off ? ` · save ${Math.round(period.off * 100)}%` : ''}`);
const waLink = (text) => `${cfg.wa}?text=${encodeURIComponent(text)}`;
const periodName = () => (period.months === 1 ? 'monthly' : period.months === 12 ? 'yearly' : `${period.months}-month`);

function setPeriod(id) {
  period = cfg.periods.find((p) => p.id === Number(id));
  document.querySelectorAll('[data-period]').forEach((b) => {
    const on = Number(b.dataset.period) === period.id;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  renderPlans();
  renderBuilder();
}

function renderPlans() {
  cfg.plans.forEach((p) => {
    const card = document.querySelector(`[data-plan="${p.key}"]`);
    if (!card) return;
    const m = round100(p.price * (1 - period.off));
    card.querySelector('[data-price]').textContent = fmt(m);
    card.querySelector('[data-bill]').textContent = billText(m);
    card.querySelector('[data-cta]').href = waLink(`Hi Display Egypt, I'd like to start the ${p.name} plan (${periodName()}, EGP ${fmt(m)} / month).`);
  });
}

function values(fs) {
  const v = {};
  fs.querySelectorAll('input[type=range]').forEach((r) => {
    v[r.dataset.k] = Number(r.value);
    const o = r.parentElement.querySelector('output');
    o.textContent = r.dataset.k === 'budget' ? `EGP ${fmt(r.value)}` : r.value;
    const pct = ((r.value - r.min) / (r.max - r.min)) * 100;
    r.style.setProperty('--p', pct + '%');
  });
  return v;
}

function renderBuilder() {
  const lines = [];
  let sub = 0;
  let services = 0;
  document.querySelectorAll('.pb-svc').forEach((fs) => {
    const on = fs.querySelector('legend input').checked;
    fs.classList.toggle('is-on', on);
    const v = values(fs);
    if (!on) return;
    const r = RATES[fs.dataset.svc];
    const price = round100(r.f(v));
    sub += price;
    services++;
    lines.push([r.label, r.desc(v), price]);
  });
  document.querySelectorAll('[data-add]:checked').forEach((c) => {
    const [label, price] = ADDS[c.dataset.add];
    sub += price;
    lines.push([label, 'Add-on', price]);
  });
  const b = bundleOff(services);
  const bundle = round100(sub * b);
  const pd = round100((sub - bundle) * period.off);
  const total = sub - bundle - pd;

  const ul = document.querySelector('[data-lines]');
  ul.innerHTML = lines.length
    ? lines.map(([l, d, p]) => `<li><span>${l}<small>${d}</small></span><b>EGP ${fmt(p)}</b></li>`).join('')
    : '<li class="pb-empty">Switch on a service to see your price.</li>';
  document.querySelector('[data-sub]').textContent = `EGP ${fmt(sub)}`;
  const br = document.querySelector('[data-bundle-row]');
  br.hidden = !bundle;
  document.querySelector('[data-bundle-label]').textContent = `Bundle discount (${Math.round(b * 100)}%)`;
  document.querySelector('[data-bundle]').textContent = `-EGP ${fmt(bundle)}`;
  const pr = document.querySelector('[data-period-row]');
  pr.hidden = !pd;
  document.querySelector('[data-period-label]').textContent = `${period.id === 12 ? 'Yearly' : period.id + '-month'} plan (${Math.round(period.off * 100)}%)`;
  document.querySelector('[data-pdisc]').textContent = `-EGP ${fmt(pd)}`;
  document.querySelector('[data-total]').textContent = fmt(total);
  document.querySelector('[data-total-bill]').textContent = billText(total);

  const body = lines.map(([l, d, p]) => `- ${l}: ${d} (EGP ${fmt(p)})`).join('\n');
  const send = document.querySelector('[data-send]');
  send.href = waLink(`Hi Display Egypt, I built a custom plan on your website:\n${body}\nTotal: EGP ${fmt(total)} / month (${periodName()}).\nCan we talk?`);
  send.classList.toggle('is-disabled', !lines.length);
}

document.querySelectorAll('button[data-period]').forEach((b) => b.addEventListener('click', () => setPeriod(b.dataset.period)));
document.querySelector('.pb__controls').addEventListener('input', renderBuilder);
document.querySelector('.pb__controls').addEventListener('change', renderBuilder);
renderPlans();
renderBuilder();
