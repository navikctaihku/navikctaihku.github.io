/* OneChain shared site chrome — Vercel-style nav with mega dropdowns + footer.
   Usage: add <div id="site-nav"></div> after <body>, <div id="site-footer"></div>
   before </body>, and <script src="site-chrome.js" defer></script> in <head>. */
(function () {


  var icon = function (bg, glyph) {
    var paths = {
      '🌱': '<path d="M12 21V10"/><path d="M12 13c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z"/><path d="M12 17c3.8 0 6-2.1 6-6-3.8 0-6 2.1-6 6Z"/>',
      '♻️': '<path d="m7 7 2-3 2 3M9 4a8 8 0 0 1 7 4M17 17l-2 3-2-3M15 20a8 8 0 0 1-7-4M3 13l2-3 2 3"/>',
      '🎓': '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4.5c2.8 1.7 7.2 1.7 10 0V12M21 9v6"/>',
      '🪪': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M13 10h5M13 14h4"/>',
      '⚡': '<path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>',
      '📘': '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M4 19a3.5 3.5 0 0 1 3.5-3.5H20"/>',
      '🔎': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
      '⛓️': '<path d="m9.5 14.5 5-5"/><path d="M7.2 16.8 5.8 18.2a3.5 3.5 0 0 1-5-5l3.4-3.4a3.5 3.5 0 0 1 5 0"/><path d="m14.8 7.2 1.4-1.4a3.5 3.5 0 0 1 5 5l-3.4 3.4a3.5 3.5 0 0 1-5 0"/>'
    };
    var svg = paths[glyph] || '<path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/>';
    return '<span class="sc-item-icon" style="background:' + bg + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + svg + '</svg></span>';
  };
  var item = function (href, ic, name, desc) {
    return '<a class="sc-item" href="' + href + '">' +
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
        item('index.html#blockchain-services', icon('rgba(20,164,188,0.12)', '⛓️'), 'Blockchain Services', 'Build a chain, bring data on-chain, and launch real applications'),
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
      return '<li><button class="sc-menu-btn" type="button" aria-expanded="false">' + m.label + caret + '</button>' +
        '<div class="sc-panel">' + cols + '</div></li>';
    }).join('');
    return '<nav class="sc-nav"><div class="sc-nav-inner">' +
      '<a href="index.html" class="sc-logo"><img src="onchain-logo.png" alt="OneChain"></a>' +
      '<ul class="sc-menu">' + lis + '</ul>' +
      '<div class="sc-actions">' +
      '<a class="sc-btn-ghost" href="mailto:enquiries@onechain.hk">Contact</a>' +
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
      col('Company', [['Blockchain Services', 'index.html#blockchain-services'], ['Infrastructure', 'company.html#infrastructure'], ['Applications', 'company.html#applications'], ['Green Tech', 'company.html#greentech']]) +
      col('About', [['About Us', 'about.html'], ['Vision & Mission', 'about.html#vision'], ['What We Solve', 'about.html#solving'], ['Join Us', 'about.html#careers'], ['Contact', 'mailto:enquiries@onechain.hk']]) +
      col('Resources', [['API Docs', 'index.html#explore'], ['Explorer', 'index.html#explore'], ['FAQ', 'about.html#careers'], ['Service status', 'mailto:enquiries@onechain.hk?subject=Service%20status%20request']]) +
      '</div><div class="sc-footer-bottom">' +
      '<span class="sc-footer-tagline">Trust, made infrastructure.</span>' +
      '<p>© 2026 OneChain Ltd. · Cyberport 3, Pok Fu Lam, Hong Kong · <a href="mailto:enquiries@onechain.hk?subject=Privacy%20request" style="color:inherit">Privacy</a> · <a href="mailto:enquiries@onechain.hk?subject=Terms%20request" style="color:inherit">Terms</a></p>' +
      '</div></div></footer>';
  }

  function init() {
    // Site-wide typography per brand guide: Nunito display, Inter body, Noto Sans TC CJK
    if (!document.querySelector('link[href*="Nunito"]')) {
      var fl = document.createElement('link');
      fl.rel = 'stylesheet';
      fl.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap';
      document.head.appendChild(fl);
    }
    if (!document.querySelector('link[href="chrome.css"]')) {
      var chromeStyles = document.createElement('link');
      chromeStyles.rel = 'stylesheet';
      chromeStyles.href = 'chrome.css';
      document.head.appendChild(chromeStyles);
    }

    var navMount = document.getElementById('site-nav');
    if (!navMount) { navMount = document.createElement('div'); document.body.insertBefore(navMount, document.body.firstChild); }
    navMount.outerHTML = buildNav();

    var footMount = document.getElementById('site-footer');
    if (!footMount) { footMount = document.createElement('div'); document.body.appendChild(footMount); }
    footMount.outerHTML = buildFooter();

    // dropdown behaviour (click + hover with close delay)
    var items = document.querySelectorAll('.sc-menu > li');
    var closeAll = function () {
      items.forEach(function (li) {
        li.classList.remove('sc-open');
        var menuButton = li.querySelector('.sc-menu-btn');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      });
    };
    items.forEach(function (li) {
      var btn = li.querySelector('.sc-menu-btn');
      var timer;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var was = li.classList.contains('sc-open');
        closeAll();
        if (!was) {
          li.classList.add('sc-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      li.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        closeAll();
        li.classList.add('sc-open');
        btn.setAttribute('aria-expanded', 'true');
      });
      li.addEventListener('mouseleave', function () {
        timer = setTimeout(function () {
          li.classList.remove('sc-open');
          btn.setAttribute('aria-expanded', 'false');
        }, 150);
      });
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

    initFX();
  }

  /* ===== FX layer: spotlight cards, count-up stats, scroll progress ===== */
  function initFX() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1) Spotlight hover — applies to common card selectors across all pages
    var CARD_SEL = ['.pillar', '.stat', '.layer', '.app', '.vision-card', '.doing-card',
      '.solve', '.career-card', '.value-card', '.feature-card', '.product-card',
      '.explore-card', '.industry-card'].join(',');
    var DARK_SEL = '.green-card';
    if (!reduce) {
      document.querySelectorAll(CARD_SEL).forEach(function (el) { el.classList.add('sc-spot'); });
      document.querySelectorAll(DARK_SEL).forEach(function (el) { el.classList.add('sc-spot', 'sc-spot-dark'); });
      document.addEventListener('mousemove', function (e) {
        var el = e.target.closest && e.target.closest('.sc-spot');
        if (!el) return;
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sc-mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--sc-my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    }

    // 2) Count-up numbers — animates digits inside .stat b when scrolled into view
    var stats = document.querySelectorAll('.stat b');
    if (stats.length && !reduce && 'IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          countUp(entry.target);
        });
      }, { threshold: 0.6 });
      stats.forEach(function (el) { obs.observe(el); });
    }
    function countUp(el) {
      var text = el.textContent;
      var m = text.match(/([0-9][0-9,]*(?:\.[0-9]+)?)/);
      if (!m) return; // non-numeric stats like "HK" stay as-is
      var target = parseFloat(m[1].replace(/,/g, ''));
      var decimals = (m[1].split('.')[1] || '').length;
      var hasComma = m[1].indexOf(',') !== -1;
      var prefix = text.slice(0, m.index);
      var suffix = text.slice(m.index + m[1].length);
      var t0 = null, DUR = 1400;
      function frame(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / DUR);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(decimals);
        if (hasComma) val = Number(val).toLocaleString('en-US', { minimumFractionDigits: decimals });
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = text;
      }
      requestAnimationFrame(frame);
    }

    // 3) Scroll progress bar (skip if the page already has one)
    if (!document.querySelector('.scroll-progress')) {
      var bar = document.createElement('div');
      bar.className = 'sc-progress';
      document.body.appendChild(bar);
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var h = document.documentElement;
          var max = h.scrollHeight - h.clientHeight;
          bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
          ticking = false;
        });
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
