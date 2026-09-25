/* morepartiesdc.com custom layer v2 · source ~/CC/web-studio/sites/mpdc/media-repo/site/v2/mpdc.js
   Loaded from Squarespace Code Injection (footer). Everything degrades to the plain template if this fails. */
(function () {
  "use strict";
  var M = "https://samer-byte.github.io/mpdc-media/v2/";
  var SMS = "sms:+12028127900?&body=" + encodeURIComponent("Hi — table for ___ people on ___ (Fri/Sat/Sun). Name: ___");
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
      d.innerHTML = '<b>More Parties DC</b><span>For sections DM <a href="https://instagram.com/morepartiesdc">@morepartiesdc</a> · <a href="' + SMS + '">(202) 812-7900</a> · <a href="mailto:morepartiesdc@gmail.com">morepartiesdc@gmail.com</a></span><span>Washington, DC · <a href="https://posh.vip/g/more-parties-dc">Events &amp; tables on Posh</a></span>';
      (n.closest("p,h1,h2,h3,div") || n).replaceWith(d);
    }
  });


  /* 1b) Per-night Posh events (from ~/CC/shared/EVENT_FACTS.md, 9/25). RSVP buttons point at the next
         night's own Posh page, not the group page. After the list runs out, falls back to the group page. */
  var GROUP = "https://posh.vip/g/more-parties-dc";
  var POSH = {
    fri: {"2026-09-25":"rosebar-fridays-2026-9-26-7-0-1","2026-10-02":"rosebar-fridays-2026-10-3-7-0-1","2026-10-09":"rosebar-fridays-2026-10-10-7-0-1","2026-10-16":"rosebar-fridays-2026-10-17-7-0-1","2026-10-23":"rosebar-fridays-2026-10-24-7-0-1","2026-10-30":"rosebar-fridays-2026-10-31-7-0-1","2026-11-06":"rosebar-fridays-2026-11-7-8-0-1","2026-11-13":"rosebar-fridays-2026-11-14-8-0-1","2026-11-20":"rosebar-fridays-2026-11-21-8-0-1","2026-11-27":"rosebar-fridays-2026-11-28-8-0-1","2026-12-04":"rosebar-fridays-2026-12-5-8-0-1","2026-12-11":"rosebar-fridays-2026-12-12-8-0-1","2026-12-18":"rosebar-fridays-2026-12-19-8-0-1","2026-12-25":"rosebar-fridays-2026-12-26-8-0-1","2027-01-01":"rosebar-fridays-2027-1-2-8-0-1","2027-01-08":"rosebar-fridays-2027-1-9-8-0-1","2027-01-15":"rosebar-fridays-2027-1-16-8-0-1","2027-01-22":"rosebar-fridays-2027-1-23-8-0-1","2027-01-29":"rosebar-fridays-2027-1-30-8-0-1","2027-02-05":"rosebar-fridays-2027-2-6-8-0-1","2027-02-12":"rosebar-fridays-2027-2-13-8-0-1","2027-02-19":"rosebar-fridays-2027-2-20-8-0-1","2027-02-26":"rosebar-fridays-2027-2-27-8-0-1","2027-03-05":"rosebar-fridays-2027-3-6-8-0-1"},
    sat: {"2026-09-26":"sax-saturdays-2026-9-27-7-0","2026-10-03":"sax-saturdays-2026-10-4-7-0","2026-10-10":"sax-saturdays-2026-10-11-7-0","2026-10-17":"sax-saturdays-2026-10-18-7-0","2026-10-24":"sax-saturdays-2026-10-25-7-0","2026-10-31":"sax-saturdays-2026-11-1-7-0","2026-11-07":"sax-saturdays-2026-11-8-8-0","2026-11-14":"sax-saturdays-2026-11-15-8-0","2026-11-21":"sax-saturdays-2026-11-22-8-0","2026-11-28":"sax-saturdays-2026-11-29-8-0","2026-12-05":"sax-saturdays-2026-12-6-8-0","2026-12-12":"sax-saturdays-2026-12-13-8-0","2026-12-19":"sax-saturdays-2026-12-20-8-0","2026-12-26":"sax-saturdays-2026-12-27-8-0","2027-01-02":"sax-saturdays-2027-1-3-8-0","2027-01-09":"sax-saturdays-2027-1-10-8-0","2027-01-16":"sax-saturdays-2027-1-17-8-0","2027-01-23":"sax-saturdays-2027-1-24-8-0","2027-01-30":"sax-saturdays-2027-1-31-8-0","2027-02-06":"sax-saturdays-2027-2-7-8-0","2027-02-13":"sax-saturdays-2027-2-14-8-0","2027-02-20":"sax-saturdays-2027-2-21-8-0","2027-02-27":"sax-saturdays-2027-2-28-8-0","2027-03-06":"sax-saturdays-2027-3-7-8-0"},
    sun: {"2026-09-27":"rosebar-sundays-2026-9-28-7-0","2026-10-04":"rosebar-sundays-2026-10-5-7-0","2026-10-11":"rosebar-sundays-2026-10-12-7-0","2026-10-18":"rosebar-sundays-2026-10-19-7-0","2026-10-25":"rosebar-sundays-2026-10-26-7-0","2026-11-01":"rosebar-sundays-2026-11-2-8-0","2026-11-08":"rosebar-sundays-2026-11-9-8-0","2026-11-15":"rosebar-sundays-2026-11-16-8-0","2026-11-22":"rosebar-sundays-2026-11-23-8-0","2026-11-29":"rosebar-sundays-2026-11-30-8-0","2026-12-06":"rosebar-sundays-2026-12-7-8-0","2026-12-13":"rosebar-sundays-2026-12-14-8-0","2026-12-20":"rosebar-sundays-2026-12-21-8-0","2026-12-27":"rosebar-sundays-2026-12-28-8-0","2027-01-03":"rosebar-sundays-2027-1-4-8-0","2027-01-10":"rosebar-sundays-2027-1-11-8-0","2027-01-17":"rosebar-sundays-2027-1-18-8-0","2027-01-24":"rosebar-sundays-2027-1-25-8-0","2027-01-31":"rosebar-sundays-2027-2-1-8-0","2027-02-07":"rosebar-sundays-2027-2-8-8-0","2027-02-14":"rosebar-sundays-2027-2-15-8-0","2027-02-21":"rosebar-sundays-2027-2-22-8-0","2027-02-28":"rosebar-sundays-2027-3-1-8-0","2027-03-07":"rosebar-sundays-2027-3-8-8-0"}
  };
  function etDate(d) { /* the date in America/New_York as YYYY-MM-DD */
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  }
  function nextNight(key) {
    var today = etDate(new Date()), best = null;
    Object.keys(POSH[key]).sort().some(function (d) { if (d >= today) { best = d; return true; } return false; });
    return best ? { date: best, url: "https://posh.vip/e/" + POSH[key][best] } : { date: null, url: GROUP };
  }
  function etOffset(ymd) { /* "-04:00" in daylight time, "-05:00" in standard time, for that date in DC */
    var probe = new Date(ymd + "T17:00:00Z");
    var hh = +new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "2-digit", hour12: false }).format(probe);
    return (hh === 13) ? "-04:00" : "-05:00";
  }
  function addDays(ymd, n) { var d = new Date(ymd + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }

  /* 1c) Event structured data — DC wall-clock times with the right offset (Googlebot renders in UTC, so
         setHours() published 10pm as 6pm). Home lists all three nights; a night page lists only its night. */
  var NIGHTS = [
    { key: "fri", path: "/rosebar-fri", name: "Rosebar Fridays", doors: "22:00", end: "03:00", venue: "Rosebar Lounge", addr: "1215 Connecticut Ave NW, Washington, DC 20036" },
    { key: "sat", path: "/sax-sat", name: "SAX Saturdays", doors: "23:00", end: "03:00", venue: "SAX", addr: "734 11th St NW, Washington, DC 20001" },
    { key: "sun", path: "/rosebar-sundays", name: "Rosebar Sundays", doors: "23:00", end: "03:00", venue: "Rosebar Lounge", addr: "1215 Connecticut Ave NW, Washington, DC 20036" }
  ];
  (function schema() {
    try {
      var path = location.pathname.replace(/\/$/, "") || "/";
      var home = document.body.classList.contains("homepage") || path === "/" || path === "/home";
      var list = NIGHTS.filter(function (n) { return home || path === n.path; });
      if (!list.length) return;
      var today = etDate(new Date()), out = [];
      list.forEach(function (n) {
        Object.keys(POSH[n.key]).sort().filter(function (d) { return d >= today; }).slice(0, 4).forEach(function (d) {
          var off = etOffset(d), endDay = addDays(d, 1);
          out.push({ "@context": "https://schema.org", "@type": "Event", "name": n.name,
            "startDate": d + "T" + n.doors + ":00" + off, "endDate": endDay + "T" + n.end + ":00" + etOffset(endDay),
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode", "eventStatus": "https://schema.org/EventScheduled",
            "location": { "@type": "Place", "name": n.venue, "address": n.addr },
            "organizer": { "@type": "Organization", "name": "More Parties DC", "url": "https://morepartiesdc.com/" },
            "offers": { "@type": "Offer", "url": "https://posh.vip/e/" + POSH[n.key][d], "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "name": "Free RSVP" },
            "url": "https://morepartiesdc.com" + n.path, "typicalAgeRange": "21+" });
        });
      });
      var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.id = "mpdc-events-ld"; sc.text = JSON.stringify(out);
      document.head.appendChild(sc);
    } catch (e) {}
  })();


  /* 1d) Night pages: a real H1 + the night's facts at the top (the template pages had no heading search
         engines read as the title). Facts from ~/CC/shared/VENUE_TERMS.md; only Confirmed values. */
  var NOTES = { "2026-09-26": "This Saturday: hosted by PARTYNEXTDOOR" };
  var INTRO = {
    fri: { day: "Every Friday", h1: "Rosebar Fridays at Rosebar Lounge, DC",
      p: "Friday nights at Rosebar Lounge, 1215 Connecticut Ave NW near Dupont Circle. Doors open at 10pm, entry is free before 11pm with an RSVP (capacity permitting), and it's 21+. Hip-hop and Top 100 all night — fashionable attire.",
      facts: ["Doors 10pm · 21+", "Free before 11pm with RSVP", "Tables from $500 · $250 deposit, $500 when the minimum is $1,500+", "Deposits are non-refundable and go toward your minimum", "Arrive by 12:30am or the table can be released", "32% service fee and tax on the final bill", "Extra guests $40 each"],
      table: '<a class="mpdc-btn mpdc-btn--ghost" href="https://posh.vip/e/rosebar-table-deposits">Reserve a table</a>' },
    sat: { day: "Every Saturday", h1: "SAX Saturdays at SAX, Downtown DC",
      p: "Saturday nights at SAX, 734 11th St NW in downtown DC. Doors at 11pm (earlier on holidays and hosted nights), 21+, and entry is free before midnight with an RSVP. Hip-hop and Top 100 — fashionable attire.",
      facts: ["Doors 11pm · 21+ (earlier on holidays and hosted nights)", "Free before midnight with RSVP", "Tables from $500", "Arrive by 12:30am or the table can be released", "32% service fee and tax on the final bill", "Deposits are non-refundable", "Extra guests $40 each"],
      table: '<a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a>' },
    sun: { day: "Every Sunday", h1: "Rosebar Sundays (#SundayService), DC",
      p: "Sunday nights at Rosebar Lounge, 1215 Connecticut Ave NW. Doors at 11pm, 21+, and entry is free before midnight with an RSVP. Hip-hop and Top 100.",
      facts: ["Doors 11pm · 21+", "Free before midnight with RSVP", "Tables from $500", "Deposits are non-refundable"],
      table: '<a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a>' }
  };
  (function nightPage() {
    var path = location.pathname.replace(/\/$/, "");
    var n = NIGHTS.filter(function (x) { return x.path === path; })[0];
    if (!n || document.getElementById("mpdc-night-intro")) return;
    var first = document.querySelector("main section.page-section") || document.querySelector(".page-section");
    if (!first) return;
    var c = INTRO[n.key], nx = nextNight(n.key), note = nx.date && NOTES[nx.date];
    var when = nx.date ? new Date(nx.date + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }) : "";
    first.before(el('<section class="mpdc-info" id="mpdc-night-intro" aria-labelledby="mpdc-night-h1"><div class="mpdc-wrap">'
      + '<span class="mpdc-day">' + c.day + '</span><h1 id="mpdc-night-h1">' + c.h1 + '</h1><p class="mpdc-sub">' + c.p + '</p>'
      + (note ? '<p class="mpdc-note">' + note + '</p>' : '')
      + '<ul class="mpdc-facts">' + c.facts.map(function (f) { return '<li>' + f + '</li>'; }).join("") + '</ul>'
      + '<div class="mpdc-actions"><a class="mpdc-btn" href="' + nx.url + '">RSVP free' + (when ? ' · ' + when : '') + '</a>' + c.table + '<a class="mpdc-link" href="/">All nights</a></div>'
      + '</div></section>'));
    /* clear the transparent Squarespace header that floats over the first section */
    var intro = document.getElementById("mpdc-night-intro"), hdr = document.querySelector("header#header, header.header, header");
    function clearHeader() { if (intro && hdr) intro.style.paddingTop = Math.max(72, Math.round(hdr.getBoundingClientRect().height) + 36) + "px"; }
    clearHeader(); window.addEventListener("resize", clearHeader);
    /* hide the template's stale fact lines — the intro above carries the canonical terms (VENUE_TERMS 9/24) */
    var stale = [/^TABLE MINIMUMS\s*\$/i, /23%\s*GRATUITY/i, /^HOURS:/i, /TABLE CAN BE TAKEN/i];
    if (n.key === "fri") stale.push(/^FREE BEFORE 12\s*AM/i);
    document.querySelectorAll("main p").forEach(function (pp) {
      if (pp.closest("#mpdc-night-intro")) return;
      var t = pp.textContent.trim();
      if (stale.some(function (re) { return re.test(t); })) pp.style.display = "none";
    });
  })();

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
      lines: '<li><strong>Rosebar Lounge</strong> · 1215 Connecticut Ave NW</li><li>Doors <strong>10pm</strong> · 21+</li><li><strong>Free before 11pm</strong> with RSVP</li><li>Tables from <strong>$500</strong> · $250 / $500 deposits</li><li>Hip-hop + Top 100 · fashionable attire</li>',
      actions: '<a class="mpdc-btn" href="' + nextNight("fri").url + '">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="https://posh.vip/e/rosebar-table-deposits">Reserve a table</a><a class="mpdc-link" href="/rosebar-fri">Friday details</a>' },
    { day: "Saturday", name: "SAX Saturdays", media: loop(M + "card-sax-saturdays.mp4", M + "card-sax-saturdays.webp", "SAX Saturdays fire performers"),
      lines: '<li><strong>SAX</strong> · 734 11th St NW</li><li>Doors <strong>11pm</strong> · 21+</li><li><strong>Free before midnight</strong> with RSVP</li><li>Tables from <strong>$500</strong></li><li>Hip-hop + Top 100 · fashionable attire</li>',
      actions: '<a class="mpdc-btn" href="' + nextNight("sat").url + '">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a><a class="mpdc-link" href="/sax-sat">Saturday details</a>' },
    { day: "Sunday", name: "Rosebar Sundays", media: loop(M + "card-rosebar-sundays.mp4", M + "card-rosebar-sundays.webp", "Rosebar Sundays — the Rosebar sign and bottle parade"),
      lines: '<li><strong>Rosebar Lounge</strong> · 1215 Connecticut Ave NW</li><li>Doors <strong>11pm</strong> · 21+</li><li>#SundayService · <strong>free before midnight</strong> with RSVP</li><li>Tables from <strong>$500</strong></li><li>Hip-hop + Top 100</li>',
      actions: '<a class="mpdc-btn" href="' + nextNight("sun").url + '">RSVP free</a><a class="mpdc-btn mpdc-btn--ghost" href="' + SMS + '">Text for a table</a><a class="mpdc-link" href="/rosebar-sundays">Sunday details</a>' }
  ];
  var cards = nights.map(function (n) {
    var key = { Friday: "fri", Saturday: "sat", Sunday: "sun" }[n.day], nx = nextNight(key), note = nx.date && NOTES[nx.date];
    return '<article class="mpdc-card"><div class="mpdc-card-media">' + n.media + '</div><span class="mpdc-day">' + n.day + '</span><h3>' + n.name + '</h3>' + (note ? '<p class="mpdc-note">' + note + '</p>' : '') + '<ul>' + n.lines + '</ul><div class="mpdc-actions">' + n.actions + '</div></article>';
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
  var specials = [  /* add {ends,url,name,when,cta} to show a special; section hides when empty (OJ 9/22) */
    { ends: "2026-09-27", url: "https://posh.vip/e/sax-saturdays-2026-9-27-7-0", name: "SAX Saturdays hosted by PARTYNEXTDOOR", when: "Saturday, Sept 26 · SAX, 734 11th St NW", cta: "RSVP on Posh" },
    { ends: "2026-09-27", url: "https://posh.vip/e/sax-saturdays-hosted-by-partynextdoor-section-deposit-fee", name: "PARTYNEXTDOOR night — reserve a section", when: "Saturday, Sept 26 · section deposit on Posh", cta: "Reserve" }
  ];
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var upcoming = specials.filter(function (e) { return new Date(e.ends + "T00:00:00") > today; }).map(function (e) {
    return '<a class="mpdc-event" href="' + e.url + '"><div><b>' + e.name + '</b><span>' + e.when + '</span></div><span>' + e.cta + '</span></a>';
  }).join("");

  var html = ''
    + '<section class="mpdc-info" id="this-weekend" aria-labelledby="mpdc-h1"><div class="mpdc-wrap">'
    + '<h1 id="mpdc-h1" class="mpdc-h1">DC nightlife, every weekend.</h1><p class="mpdc-sub">Rosebar Fridays, SAX Saturdays and Rosebar Sundays — three rooms, three nights, one crew. RSVP is free; tables hold with a deposit.</p>'
    + '<div class="mpdc-cards">' + cards + '</div></div></section>'
    + '<section class="mpdc-info mpdc-info--alt" id="watch" aria-labelledby="mpdc-hw"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-hw">Watch the nights.</h2><p class="mpdc-sub">Real rooms, real crowds — shot on the night by our team. Tap to play with sound.</p>'
    + '<div class="mpdc-reels">' + reelHtml + '</div></div></section>'
    + '<section class="mpdc-info" id="tables" aria-labelledby="mpdc-h2"><div class="mpdc-wrap">'
    + '<h2 id="mpdc-h2">Tables, plainly.</h2><p class="mpdc-sub">What a section costs and how it works — before you text.</p>'
    + '<div class="mpdc-cols"><div><h3>How it works</h3><p>Pick your night, reserve with a deposit, and it is applied in full to your minimum. You get a confirmation text with your table and arrival time.</p></div>'
    + '<div><h3>What it costs</h3><p>Tables start at $500 every night; premium sections run higher. Friday deposits are $250, or $500 when the minimum is $1,500 or more, on Posh. A 32% service fee and tax is added to the final bill.</p></div>'
    + '<div><h3>Arrive on time</h3><p>Tables not claimed by 12:30am can be released. Prices change on celebrity-host nights — the confirmation text is the final word.</p></div></div>'
    + '<div class="mpdc-actions"><a class="mpdc-btn" href="' + SMS + '">Text (202) 812-7900 to book</a><a class="mpdc-btn mpdc-btn--ghost" href="/table-reservation">Table reservations</a></div>'
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
    if (hd && /^\s*special events\s*$/i.test(hd.textContent)) sec.remove();
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
