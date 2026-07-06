/* OneChain shared site chrome — Vercel-style nav with mega dropdowns + footer.
   Usage: add <div id="site-nav"></div> after <body>, <div id="site-footer"></div>
   before </body>, and <script src="site-chrome.js" defer></script> in <head>. */
(function () {
  var CSS = `
  :root {
    --sc-ink: #0A1628;
    --sc-muted: #64748B;
    --sc-muted-2: #94A3B8;
    --sc-border: rgba(10,22,40,0.08);
    --sc-border-2: rgba(10,22,40,0.12);
    --sc-primary: #016282;
    --sc-green: #2ECC71;
    --sc-gold: #F0B429;
    --sc-purple: #7F77DD;
    --sc-cyan: #00B4D8;
  }
  .sc-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 64px;
    background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--sc-border);
    font-family: 'Inter', -apple-system, sans-serif; }
  .sc-nav-inner { max-width: 1280px; height: 100%; margin: 0 auto; padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .sc-logo img { height: 36px; width: auto; display: block; }
  .sc-menu { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
  .sc-menu > li { position: relative; }
  .sc-menu-btn { display: inline-flex; align-items: center; gap: 6px; border: none; background: none;
    cursor: pointer; font: 500 14px/1 'Inter', sans-serif; color: var(--sc-muted);
    padding: 10px 14px; border-radius: 8px; transition: color .15s, background .15s; }
  .sc-menu-btn:hover, .sc-menu > li.sc-open > .sc-menu-btn { color: var(--sc-ink); background: rgba(10,22,40,0.04); }
  .sc-menu-btn .sc-caret { transition: transform .2s; }
  .sc-menu > li.sc-open .sc-caret { transform: rotate(180deg); }
  .sc-panel { position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(6px);
    background: #fff; border: 1px solid var(--sc-border-2); border-radius: 14px;
    box-shadow: 0 24px 64px rgba(10,22,40,0.14), 0 4px 16px rgba(10,22,40,0.06);
    padding: 20px; display: flex; gap: 28px;
    opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .18s ease, transform .18s ease; }
  .sc-menu > li.sc-open > .sc-panel { opacity: 1; visibility: visible; pointer-events: auto;
    transform: translateX(-50%) translateY(0); }
  .sc-col { min-width: 230px; }
  .sc-col-title { font: 600 11px/1 'Inter', sans-serif; letter-spacing: 1.6px; text-transform: uppercase;
    color: var(--sc-cyan); margin: 4px 8px 12px; white-space: nowrap; }
  .sc-item { display: flex; gap: 12px; align-items: flex-start; padding: 10px 8px; border-radius: 10px;
    text-decoration: none; color: inherit; transition: background .15s; }
  .sc-item:hover { background: rgba(10,22,40,0.045); }
  .sc-item-icon { width: 34px; height: 34px; flex: none; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; font-size: 16px; }
  .sc-item-name { font: 600 14px/1.3 'Inter', sans-serif; color: var(--sc-ink); }
  .sc-item-desc { font: 400 12.5px/1.45 'Inter', sans-serif; color: var(--sc-muted); margin-top: 2px; }
  .sc-actions { display: flex; align-items: center; gap: 10px; }
  .sc-btn-ghost { font: 500 14px/1 'Inter', sans-serif; color: var(--sc-muted); text-decoration: none;
    padding: 9px 14px; border-radius: 8px; transition: color .15s, background .15s; }
  .sc-btn-ghost:hover { color: var(--sc-ink); background: rgba(10,22,40,0.04); }
  .sc-btn-primary { font: 600 14px/1 'Inter', sans-serif; color: #fff; background: var(--sc-ink);
    text-decoration: none; padding: 10px 18px; border-radius: 8px; transition: background .2s, transform .2s; }
  .sc-btn-primary:hover { background: #1a2a40; transform: translateY(-1px); }
  .sc-burger { display: none; border: none; background: none; cursor: pointer; font-size: 22px;
    color: var(--sc-ink); padding: 8px; }
  /* mobile */
  @media (max-width: 1023px) {
    .sc-menu, .sc-actions .sc-btn-ghost { display: none; }
    .sc-burger { display: block; }
    .sc-mobile { position: fixed; top: 64px; left: 0; right: 0; bottom: 0; z-index: 999; overflow-y: auto;
      background: #fff; padding: 16px 24px 48px; display: none; font-family: 'Inter', sans-serif; }
    .sc-mobile.sc-open { display: block; }
    .sc-mgroup { border-bottom: 1px solid var(--sc-border); padding: 14px 0; }
    .sc-mgroup > div:first-child { font: 600 15px/1 'Inter', sans-serif; color: var(--sc-ink); }
    .sc-mgroup a { display: block; padding: 10px 0 0 12px; font: 400 14px/1.4 'Inter', sans-serif;
      color: var(--sc-muted); text-decoration: none; }
  }
  @media (min-width: 1024px) { .sc-mobile { display: none !important; } }
  body > nav:not(.sc-nav) { display: none !important; }
  /* footer */
  .sc-footer { background: #FAFAFA; border-top: 1px solid var(--sc-border);
    font-family: 'Inter', -apple-system, sans-serif; }
  .sc-footer-inner { max-width: 1280px; margin: 0 auto; padding: 64px 24px 32px; }
  .sc-footer-grid { display: grid; grid-template-columns: 1.6fr repeat(5, 1fr); gap: 40px; margin-bottom: 56px; }
  .sc-footer-brand img { height: 32px; width: auto; }
  .sc-footer-brand p { font-size: 13.5px; color: var(--sc-muted); margin: 14px 0 0; line-height: 1.6; max-width: 240px; }
  .sc-fcol h5 { font: 600 11px/1 'Inter', sans-serif; letter-spacing: 1.6px; text-transform: uppercase;
    color: var(--sc-muted-2); margin: 0 0 18px; }
  .sc-fcol ul { list-style: none; margin: 0; padding: 0; }
  .sc-fcol li { margin-bottom: 12px; }
  .sc-fcol a { font-size: 14px; color: var(--sc-muted); text-decoration: none; transition: color .15s; }
  .sc-fcol a:hover { color: var(--sc-ink); }
  .sc-footer-bottom { border-top: 1px solid var(--sc-border); padding-top: 24px; display: flex;
    justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .sc-footer-bottom p { font-size: 13px; color: var(--sc-muted); margin: 0; }
  .sc-footer-tagline { font: 500 14px/1 'Inter', sans-serif; color: var(--sc-primary); }
  @media (max-width: 1023px) { .sc-footer-grid { grid-template-columns: 1fr 1fr; } }
  body > footer:not(.sc-footer) { display: none !important; }
  `;

  var icon = function (bg, glyph) {
    return '<span class="sc-item-icon" style="background:' + bg + '">' + glyph + '</span>';
  };
  var item = function (href, ic, name, desc) {
    return '<a class="sc-item" href="' + href + '">' + ic +
      '<span><span class="sc-item-name">' + name + '</span>' +
      '<span class="sc-item-desc" style="display:block">' + desc + '</span></span></a>';
  };
  var caret = '<svg class="sc-caret" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var MENUS = [
    { label: 'Products', cols: [
      { title: 'Flagship Products', items: [
        item('esgledger.html', icon('rgba(46,204,113,0.12)', '🌱'), 'ESGLedger', 'Blockchain-verified ESG data & plastic credit marketplace'),
        item('certledger.html', icon('rgba(240,180,41,0.14)', '🎓'), 'CertLedger', 'Tamper-proof credentials, verified in seconds'),
      ]},
      { title: 'Platform', items: [
        item('index.html#explore', icon('rgba(0,180,216,0.12)', '⚡'), 'API Platform', 'Integrate verification into your own stack'),
        item('index.html#products', icon('rgba(127,119,221,0.12)', '🧩'), 'All Products', 'See everything built on OneChain'),
      ]},
    ]},
    { label: 'Solutions', cols: [
      { title: 'By Use Case', items: [
        item('esgledger.html', icon('rgba(46,204,113,0.12)', '♻️'), 'ESG & Sustainability', 'Anti-greenwashing data and plastic credits'),
        item('certledger.html', icon('rgba(240,180,41,0.14)', '🪪'), 'Credentials & Identity', 'Issue, hold, and verify digital certificates'),
      ]},
      { title: 'By Industry', items: [
        item('certledger.html', icon('rgba(1,98,130,0.10)', '🏫'), 'Education', 'Diplomas and transcripts anyone can verify'),
        item('certledger.html', icon('rgba(1,98,130,0.10)', '🏛️'), 'Government', 'Regulatory-grade audit trails and licences'),
        item('esgledger.html', icon('rgba(1,98,130,0.10)', '🏦'), 'Green Finance', 'Provable impact for sustainable capital'),
      ]},
    ]},
    { label: 'Company', cols: [
      { title: 'What We Build', items: [
        item('company.html#infrastructure', icon('rgba(1,98,130,0.10)', '🗄️'), 'Infrastructure', 'Three-layer enterprise blockchain stack'),
        item('company.html#applications', icon('rgba(127,119,221,0.12)', '📦'), 'Applications', 'Products in production on OneChain'),
        item('company.html#greentech', icon('rgba(46,204,113,0.12)', '🌿'), 'Green Tech', 'Circular economy and climate technology'),
      ]},
    ]},
    { label: 'About', cols: [
      { title: 'Who We Are', items: [
        item('about.html', icon('rgba(1,98,130,0.10)', '🏢'), 'About Us', 'Our story, from Cyberport to today'),
        item('about.html#vision', icon('rgba(0,180,216,0.12)', '🧭'), 'Vision & Mission', 'What we believe and where we\u2019re going'),
        item('about.html#solving', icon('rgba(240,180,41,0.14)', '🔍'), 'What We Solve', 'The trust problems we exist to fix'),
        item('about.html#careers', icon('rgba(46,204,113,0.12)', '🚀'), 'Join Us', 'Why builders choose OneChain'),
      ]},
    ]},
    { label: 'Resources', cols: [
      { title: 'Developers', items: [
        item('index.html#explore', icon('rgba(1,98,130,0.10)', '📘'), 'API Docs', 'Reference and integration guides'),
        item('index.html#explore', icon('rgba(0,180,216,0.12)', '🔎'), 'Explorer', 'Inspect the chain in real time'),
      ]},
      { title: 'Support', items: [
        item('mailto:enquiries@onechain.hk', icon('rgba(127,119,221,0.12)', '💬'), 'Contact', 'Talk to the team'),
        item('about.html#careers', icon('rgba(240,180,41,0.14)', '❓'), 'FAQ', 'Common questions, answered'),
      ]},
    ]},
  ];

  function buildNav() {
    var lis = MENUS.map(function (m) {
      var cols = m.cols.map(function (c) {
        return '<div class="sc-col"><div class="sc-col-title">' + c.title + '</div>' + c.items.join('') + '</div>';
      }).join('');
      return '<li><button class="sc-menu-btn" type="button">' + m.label + caret + '</button>' +
        '<div class="sc-panel">' + cols + '</div></li>';
    }).join('');
    return '<nav class="sc-nav"><div class="sc-nav-inner">' +
      '<a href="index.html" class="sc-logo"><img src="onchain-logo.png" alt="OneChain"></a>' +
      '<ul class="sc-menu">' + lis + '</ul>' +
      '<div class="sc-actions">' +
      '<a class="sc-btn-ghost" href="mailto:enquiries@onechain.hk">Contact</a>' +
      '<a class="sc-btn-primary" href="mailto:enquiries@onechain.hk">Get a Demo</a>' +
      '<button class="sc-burger" aria-label="Menu" type="button">☰</button>' +
      '</div></div></nav>' + buildMobile();
  }

  function buildMobile() {
    var html = MENUS.map(function (m) {
      var links = [];
      m.cols.forEach(function (c) {
        c.items.forEach(function (it) {
          var href = it.match(/href="([^"]+)"/)[1];
          var name = it.match(/sc-item-name">([^<]+)</)[1];
          links.push('<a href="' + href + '">' + name + '</a>');
        });
      });
      return '<div class="sc-mgroup"><div>' + m.label + '</div>' + links.join('') + '</div>';
    }).join('');
    return '<div class="sc-mobile">' + html +
      '<div class="sc-mgroup"><a href="mailto:enquiries@onechain.hk" style="padding-left:0;font-weight:600;color:var(--sc-ink)">Contact Us</a></div></div>';
  }

  function buildFooter() {
    var col = function (title, links) {
      return '<div class="sc-fcol"><h5>' + title + '</h5><ul>' +
        links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') +
        '</ul></div>';
    };
    return '<footer class="sc-footer"><div class="sc-footer-inner"><div class="sc-footer-grid">' +
      '<div class="sc-footer-brand"><img src="onchain-logo.png" alt="OneChain">' +
      '<p>Full-stack blockchain company building the trust layer for Asia. Cyberport, Hong Kong.</p></div>' +
      col('Products', [['ESGLedger', 'esgledger.html'], ['CertLedger', 'certledger.html'], ['API Platform', 'index.html#explore']]) +
      col('Solutions', [['ESG & Sustainability', 'esgledger.html'], ['Credentials & Identity', 'certledger.html'], ['Education', 'certledger.html'], ['Government', 'certledger.html'], ['Green Finance', 'esgledger.html']]) +
      col('Company', [['Infrastructure', 'company.html#infrastructure'], ['Applications', 'company.html#applications'], ['Green Tech', 'company.html#greentech']]) +
      col('About', [['About Us', 'about.html'], ['Vision & Mission', 'about.html#vision'], ['What We Solve', 'about.html#solving'], ['Join Us', 'about.html#careers'], ['Contact', 'mailto:enquiries@onechain.hk']]) +
      col('Resources', [['API Docs', 'index.html#explore'], ['Explorer', 'index.html#explore'], ['FAQ', 'about.html#careers'], ['Status', '#']]) +
      '</div><div class="sc-footer-bottom">' +
      '<span class="sc-footer-tagline">Trust, made infrastructure.</span>' +
      '<p>© 2026 OneChain Ltd. · Cyberport 3, Pok Fu Lam, Hong Kong · <a href="#" style="color:inherit">Privacy</a> · <a href="#" style="color:inherit">Terms</a></p>' +
      '</div></div></footer>';
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var navMount = document.getElementById('site-nav');
    if (!navMount) { navMount = document.createElement('div'); document.body.insertBefore(navMount, document.body.firstChild); }
    navMount.outerHTML = buildNav();

    var footMount = document.getElementById('site-footer');
    if (!footMount) { footMount = document.createElement('div'); document.body.appendChild(footMount); }
    footMount.outerHTML = buildFooter();

    // dropdown behaviour (click + hover with close delay)
    var items = document.querySelectorAll('.sc-menu > li');
    var closeAll = function () { items.forEach(function (li) { li.classList.remove('sc-open'); }); };
    items.forEach(function (li) {
      var btn = li.querySelector('.sc-menu-btn');
      var timer;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var was = li.classList.contains('sc-open');
        closeAll();
        if (!was) li.classList.add('sc-open');
      });
      li.addEventListener('mouseenter', function () { clearTimeout(timer); closeAll(); li.classList.add('sc-open'); });
      li.addEventListener('mouseleave', function () { timer = setTimeout(function () { li.classList.remove('sc-open'); }, 150); });
    });
    document.addEventListener('click', closeAll);

    // mobile menu
    var burger = document.querySelector('.sc-burger');
    var mobile = document.querySelector('.sc-mobile');
    if (burger && mobile) {
      burger.addEventListener('click', function (e) {
        e.stopPropagation();
        mobile.classList.toggle('sc-open');
        burger.textContent = mobile.classList.contains('sc-open') ? '✕' : '☰';
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
