/* morepartiesdc.com custom layer v2 · source ~/CC/web-studio/sites/mpdc/media-repo/site/v2/mpdc.js
   Loaded from Squarespace Code Injection (footer). Everything degrades to the plain template if this fails. */
(function () {
  "use strict";
  var M = "https://samer-byte.github.io/mpdc-media/v2/";
  var SMS = "sms:+14436739234?&body=" + encodeURIComponent("Hi — table for ___ people on ___ (Fri/Sat/Sun). Name: ___");
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOBILE = window.matchMedia && matchMedia("(max-width: 767px)").matches;
  var SAVE_DATA = navigator.connection && navigator.connection.saveData;

  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; }

  /* muted loops play only while on screen */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (v.dataset.src && !v.src) { v.src = v.dataset.src; } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }, { threshold: 0.25 }) : null;

  function loop(src, poster, alt) {
    if (RM || SAVE_DATA || !io) return '<img src="' + poster + '" alt="' + alt + '" loading="lazy" decoding="async">';
    return '<video class="mpdc-loop" muted loop playsinline preload="none" poster="' + poster + '" data-src="' + src + '" aria-label="' + alt + '"></video>';
  }

  /* 0) header backing after the first screen of scroll (all pages) */
  var lastY = window.scrollY;
  var onScroll = function () {
    var y = window.scrollY, b = document.body;
    b.classList.toggle("mpdc-scrolled", y > 60);
    if (Math.abs(y - lastY) > 6) { b.classList.toggle("mpdc-hide-header", y > lastY && y > 400 && !b.classList.contains("header--menu-open")); lastY = y; }
  };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* 1) Footer identity: replace the template placeholder "Site Title" */
  document.querySelectorAll("footer *").forEach(function (n) {
    if (n.children.length === 0 && n.textContent.trim() === "Site Title" && !n.closest(".mpdc-footer-brand")) {
      var d = document.createElement("div"); d.className = "mpdc-footer-brand";
      d.innerHTML = '<b>More Parties DC</b><span>For sections DM <a href="https://instagram.com/morepartiesdc">@morepartiesdc</a> · <a href="' + SMS + '">(443) 673-9234</a> · <a href="mailto:morepartiesdc@gmail.com">morepartiesdc@gmail.com</a></span><span>Washington, DC · <a href="https://posh.vip/g/more-parties-dc">Events &amp; tables on Posh</a></span>';
      (n.closest("p,h1,h2,h3,div") || n).replaceWith(d);
    }
  });

  var isHome = document.body.classList.contains("homepage") || location.pathname === "/" || location.pathname === "/home";
  if (!isHome || document.getElementById("this-weekend")) return;
  var hero = document.querySelector("main section.page-section") || document.querySelector(".page-section");
  if (!hero) return;

  /* 2) Hero video: our cut replaces the template background loop */
  var bg = hero.querySelector(".section-background");
  if (bg) {
    var hsrc = MOBILE ? M + "hero-mobile.mp4" : M + "hero-desktop.mp4";
    var hposter = MOBILE ? M + "hero-mobile.webp" : M + "hero-desktop.webp";
    var hm = document.createElement("div"); hm.className = "mpdc-hero-media";
    hm.innerHTML = (RM || SAVE_DATA)
      ? '<img src="' + hposter + '" alt="Rosebar Fridays crowd" fetchpriority="high">'
      : '<video autoplay muted loop playsinline preload="auto" poster="' + hposter + '" aria-hidden="true"><source src="' + hsrc + '" type="video/mp4"></video>';
    bg.querySelectorAll("video").forEach(function (v) { if (!v.closest(".mpdc-hero-media")) { try { v.pause(); v.removeAttribute("src"); v.querySelectorAll("source").forEach(function (s) { s.remove(); }); v.load(); } catch (e) {} } });
    bg.appendChild(hm); hero.classList.add("mpdc-hero-host");
    var hv = hm.querySelector("video"); if (hv) { var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {}); }
  }

  /* 3) Information layer */
  var nights = [
    { day: "Friday", name: "Rosebar Fridays", media: loop(M + "card-rosebar-fridays.mp4", M + "card-rosebar-fridays.webp", "Rosebar Fridays — bottles, sparklers and the crowd"),
      lines: '<li><strong>Rosebar Lounge</strong> · 1215 Connecticut Ave NW</li><li>Doors <strong>10pm</strong> · 21+</li><li><strong>Free before 11pm</strong> with RSVP</li><li>Tables from <strong>$1K</strong> · $250 / $500 deposits</li><li>Hip-hop + Top 100 · fashionable attire</li>',
      actions: '<a class="mpdc-btn" href="https://posh.vip/g/more-parties-dc">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="https://posh.vip/e/rosebar-table-deposits">Reserve a table</a><a class="mpdc-link" href="/rosebar-fri">Friday details</a>' },
    { day: "Saturday", name: "SAX Saturdays", media: loop(M + "card-sax-saturdays.mp4", M + "card-sax-saturdays.webp", "SAX Saturdays fire performers"),
      lines: '<li><strong>SAX</strong> · 734 11th St NW</li><li>Doors <strong>11pm</strong> · 21+</li><li>Free RSVP on Posh</li><li>Tables from <strong>$1.5K</strong></li><li>Hip-hop + Top 100 · fashionable attire</li>',
      actions: '<a class="mpdc-btn" href="https://posh.vip/g/more-parties-dc">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a><a class="mpdc-link" href="/sax-sat">Saturday details</a>' },
    { day: "Sunday", name: "Rosebar Sundays", media: loop(M + "card-rosebar-sundays.mp4", M + "card-rosebar-sundays.webp", "Rosebar Sundays — the Rosebar sign and bottle parade"),
      lines: '<li><strong>Rosebar Lounge</strong> · 1215 Connecticut Ave NW</li><li>Doors <strong>11pm</strong> · 21+</li><li>#SundayService · free RSVP on Posh</li><li>Tables from <strong>$1K</strong></li><li>Hip-hop + Top 100</li>',
      actions: '<a class="mpdc-btn" href="https://posh.vip/g/more-parties-dc">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a><a class="mpdc-link" href="/rosebar-sundays">Sunday details</a>' }
  ];
  var cards = nights.map(function (n) {
    return '<article class="mpdc-card"><div class="mpdc-card-media">' + n.media + '</div><span class="mpdc-day">' + n.day + '</span><h3>' + n.name + '</h3><ul>' + n.lines + '</ul><div class="mpdc-actions">' + n.actions + '</div></article>';
  }).join("");

  var reels = [
    { file: "reel-announcement", title: "The announcement", sub: "Rosebar Fridays · July 2026", ig: "https://www.instagram.com/reel/DagKlVdSU4t/" },
    { file: "reel-rosebar-fridays", title: "Rosebar Fridays", sub: "Night one · July 2026", ig: "https://www.instagram.com/reel/Da5SZtfucaD/" },
    { file: "reel-like-clockwork", title: "Like clockwork", sub: "Rosebar Fridays · 11:58pm → 2:38am", ig: "https://www.instagram.com/reel/DcjyvJAyAXT/" },
    { file: "reel-sax-bubble", title: "SAX Saturdays", sub: "Bubbles · August 2026", ig: "https://www.instagram.com/reel/DbzC_nuyiNL/" },
    { file: "reel-sax-fire", title: "SAX Saturdays", sub: "Fire · August 2026", ig: "https://www.instagram.com/reel/DcFIOliuTBT/" },
    { file: "reel-tattoo", title: "Who's asking?", sub: "More Parties DC · August 2026", ig: "https://www.instagram.com/reel/DcMwHRAy8Gv/" }
  ];
  var reelHtml = reels.map(function (r, i) {
    return '<figure class="mpdc-reel" data-i="' + i + '"><div class="mpdc-reel-frame"><img src="' + M + r.file + '.webp" alt="' + r.title + ' — ' + r.sub + '" loading="lazy" decoding="async"><button class="mpdc-play" type="button" aria-label="Play ' + r.title + ', ' + r.sub + '"><span></span></button></div><figcaption><b>' + r.title + '</b><span>' + r.sub + '</span><a href="' + r.ig + '" target="_blank" rel="noopener">Watch on Instagram</a></figcaption></figure>';
  }).join("");

  /* specials hide themselves the morning after they end (ends = local date string) */
  var specials = [];  /* add {ends,url,name,when,cta} to show a special; section hides when empty (OJ 9/22) */
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var upcoming = specials.filter(function (e) { return new Date(e.ends + "T00:00:00") > today; }).map(function (e) {
    return '<a class="mpdc-event" href="' + e.url + '"><div><b>' + e.name + '</b><span>' + e.when + '</span></div><span>' + e.cta + '</span></a>';
  }).join("");

  var html = ''
    + '<section class="mpdc-info" id="this-weekend" aria-labelledby="mpdc-h1"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-h1">Every weekend in DC.</h2><p class="mpdc-sub">Three rooms, three nights, one crew. RSVP is free — tables hold with a deposit.</p>'
    + '<div class="mpdc-cards">' + cards + '</div></div></section>'
    + '<section class="mpdc-info mpdc-info--alt" id="watch" aria-labelledby="mpdc-hw"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-hw">Watch the nights.</h2><p class="mpdc-sub">Real rooms, real crowds — shot on the night by our team. Tap to play with sound.</p>'
    + '<div class="mpdc-reels">' + reelHtml + '</div></div></section>'
    + '<section class="mpdc-info" id="tables" aria-labelledby="mpdc-h2"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-h2">Tables, plainly.</h2><p class="mpdc-sub">What a section costs and how it works — before you text.</p>'
    + '<div class="mpdc-cols"><div><h3>How it works</h3><p>Pick your night, reserve with a deposit, and it is applied in full to your minimum. You get a confirmation text with your table and arrival time.</p></div>'
    + '<div><h3>What it costs</h3><p>Minimums by night: Friday $1K–1.5K · Saturday $1.5K–2K · Sunday $1K–1.5K. Friday deposits are $250 or $500 on Posh. 23% service and 10% tax are added to the final bill.</p></div>'
    + '<div><h3>Arrive on time</h3><p>Tables not claimed by 12:45am can be released. Prices change on celebrity-host nights — the confirmation text is the final word.</p></div></div>'
    + '<div class="mpdc-actions"><a class="mpdc-btn" href="' + SMS + '">Text (443) 673-9234 to book</a><a class="mpdc-btn mpdc-btn--ghost" href="/table-reservation">Table reservations</a></div>'
    + '<p class="mpdc-fine">Deposits are non-refundable. All nights 21+. Fashionable attire — no slides or athletic wear.</p>'
    + '</div></section>'
    + (upcoming ? '<section class="mpdc-info mpdc-info--alt" id="coming-up" aria-labelledby="mpdc-h3"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-h3">Coming up.</h2><p class="mpdc-sub">Specials on top of the weekly nights.</p>'
    + '<div class="mpdc-events">' + upcoming + '</div>'
    + '<div class="mpdc-actions"><a class="mpdc-btn mpdc-btn--ghost" href="https://posh.vip/g/more-parties-dc">All events on Posh</a></div>'
    + '</div></section>' : '');
  hero.after(el(html));

  /* template "SPECIAL EVENTS" poster section: hidden (it shows a passed flyer; specials now live in Coming up) */
  document.querySelectorAll("main section.page-section").forEach(function (sec) {
    var hd = sec.querySelector("h1,h2,h3");
    if (hd && /^\s*special events\s*$/i.test(hd.textContent)) sec.style.display = "none";
  });

  /* card loops: play only on screen */
  if (io) document.querySelectorAll(".mpdc-loop").forEach(function (v) { io.observe(v); });

  /* reels: tap to play with sound, one at a time */
  var active = null;
  document.querySelectorAll(".mpdc-reel").forEach(function (fig) {
    var r = reels[+fig.getAttribute("data-i")];
    fig.querySelector(".mpdc-play").addEventListener("click", function () {
      if (active && active !== fig) { var ov = active.querySelector("video"); if (ov) ov.pause(); active.classList.remove("is-playing"); }
      var frame = fig.querySelector(".mpdc-reel-frame"), v = frame.querySelector("video");
      if (!v) {
        v = document.createElement("video");
        v.setAttribute("playsinline", ""); v.controls = true; v.preload = "auto";
        v.poster = M + r.file + ".webp"; v.src = M + r.file + ".mp4";
        v.setAttribute("aria-label", r.title + " — " + r.sub);
        v.addEventListener("ended", function () { fig.classList.remove("is-playing"); });
        frame.appendChild(v);
      }
      fig.classList.add("is-playing"); active = fig;
      var p = v.play(); if (p && p.catch) p.catch(function () {}); v.focus();
    });
  });
})();
