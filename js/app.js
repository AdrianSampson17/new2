(() => {
  "use strict";

  /* ============================================================
     Data
     ============================================================ */
  const GRADIENTS = [
    "linear-gradient(135deg,#ffd95e,#ff9f1c)",
    "linear-gradient(135deg,#3a3448,#14121f)",
    "linear-gradient(135deg,#ffe27a,#c98a00)",
    "linear-gradient(135deg,#252131,#525064)",
    "linear-gradient(135deg,#ffc530,#7a4f00)",
    "linear-gradient(135deg,#4a4558,#1a1825)",
    "linear-gradient(135deg,#ffdb70,#a66a00)",
    "linear-gradient(135deg,#100e1a,#3a3448)",
  ];

  const SAMPLE_PHOTOS = [
    "assets/cards/sample-1.jpg",
    "assets/cards/sample-2.jpg",
    "assets/cards/sample-3.jpg",
    "assets/cards/sample-4.jpg",
  ];

  const DESTINATIONS = [
    { city: "Rome", country: "Italy", count: 412, emoji: "🏛️" },
    { city: "Paris", country: "France", count: 389, emoji: "🥐" },
    { city: "Bali", country: "Indonesia", count: 276, emoji: "🌴" },
    { city: "Tokyo", country: "Japan", count: 331, emoji: "🍜" },
    { city: "Santorini", country: "Greece", count: 158, emoji: "🌅" },
    { city: "New York", country: "USA", count: 447, emoji: "🗽" },
    { city: "Barcelona", country: "Spain", count: 264, emoji: "⛲" },
    { city: "Cape Town", country: "South Africa", count: 132, emoji: "🐘" },
  ];

  const CATEGORIES = [
    { id: "all", label: "All", emoji: "✨" },
    { id: "walking", label: "Walking tours", emoji: "🚶" },
    { id: "food", label: "Food & drink", emoji: "🍽️" },
    { id: "daytrip", label: "Day trips", emoji: "🚐" },
    { id: "water", label: "Boat & water", emoji: "🚤" },
    { id: "adventure", label: "Adventure", emoji: "⛰️" },
    { id: "culture", label: "Museums & art", emoji: "🖼️" },
    { id: "night", label: "Nightlife", emoji: "🌃" },
  ];

  const TOURS = [
    { title: "Colosseum & Roman Forum Skip-the-Line Tour", city: "Rome, Italy", cat: "walking", emoji: "🏛️", rating: 4.9, reviews: 12480, duration: "3 hrs", price: 59, badge: "Bestseller" },
    { title: "Seine River Sunset Cruise with Wine", cat: "water", city: "Paris, France", emoji: "🥂", rating: 4.8, reviews: 6210, duration: "1.5 hrs", price: 42, badge: "Free cancellation" },
    { title: "Ubud Rice Terraces & Waterfall Day Trip", cat: "daytrip", city: "Bali, Indonesia", emoji: "🌾", rating: 4.9, reviews: 3789, duration: "8 hrs", price: 68, badge: "Likely to sell out" },
    { title: "Tsukiji Street Food Walking Tour", cat: "food", city: "Tokyo, Japan", emoji: "🍢", rating: 4.9, reviews: 5122, duration: "3 hrs", price: 74, badge: "Bestseller" },
    { title: "Caldera Sailing Trip with BBQ & Drinks", cat: "water", city: "Santorini, Greece", emoji: "⛵", rating: 4.9, reviews: 4390, duration: "5 hrs", price: 95, badge: "Free cancellation" },
    { title: "Sunrise Hike to Table Mountain", cat: "adventure", city: "Cape Town, South Africa", emoji: "🥾", rating: 4.8, reviews: 1876, duration: "4 hrs", price: 39, badge: "" },
    { title: "MoMA & Modern Art Highlights Tour", cat: "culture", city: "New York, USA", emoji: "🖼️", rating: 4.7, reviews: 2984, duration: "2 hrs", price: 48, badge: "" },
    { title: "Gothic Quarter Tapas & Flamenco Night", cat: "night", city: "Barcelona, Spain", emoji: "💃", rating: 4.9, reviews: 3312, duration: "3.5 hrs", price: 66, badge: "Bestseller" },
  ];

  const TESTIMONIALS = [
    { quote: "Our guide in Rome knew every back alley worth seeing. Booking took two minutes and the tour itself was the highlight of our trip.", name: "Maren K.", place: "Traveled to Rome, Italy", initials: "MK", rating: 5, color: "#14121f" },
    { quote: "I was nervous about a solo trip to Tokyo, but the food tour host made me feel like a local within an hour. Worth every yen.", name: "Devon R.", place: "Traveled to Tokyo, Japan", initials: "DR", rating: 5, color: "#a66a00" },
    { quote: "Free cancellation saved us when our flight got delayed — rebooked the Santorini cruise for the next day with zero hassle.", name: "Priya S.", place: "Traveled to Santorini, Greece", initials: "PS", rating: 5, color: "#3a3448" },
    { quote: "Best price guarantee is real. Found the same tour cheaper elsewhere and support matched it within the hour.", name: "Tomás L.", place: "Traveled to Barcelona, Spain", initials: "TL", rating: 4, color: "#7a4f00" },
  ];

  /* ============================================================
     Render helpers
     ============================================================ */
  function starRow(rating) {
    const full = Math.round(rating);
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += `<svg width="14" height="14" aria-hidden="true" style="opacity:${i < full ? 1 : 0.25}"><use href="#icon-star"/></svg>`;
    }
    return out;
  }

  function renderDestinations() {
    const grid = document.getElementById("destinationGrid");
    if (!grid) return;
    grid.innerHTML = DESTINATIONS.map((d, i) => `
      <a class="destination-card" href="#featured-tours" style="--tile-bg:${GRADIENTS[i % GRADIENTS.length]}">
        <img class="destination-card__photo" src="${SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length]}" alt="" loading="lazy" onerror="this.remove()">
        <span class="destination-card__emoji">${d.emoji}</span>
        <span class="destination-card__city">${d.city}</span>
        <span class="destination-card__count">${d.count} tours &middot; ${d.country}</span>
      </a>
    `).join("");
  }

  function renderCategories() {
    const wrap = document.getElementById("categoryPills");
    if (!wrap) return;
    wrap.innerHTML = CATEGORIES.map((c, i) => `
      <button type="button" class="category-pill${i === 0 ? " is-active" : ""}" data-cat="${c.id}" role="tab" aria-selected="${i === 0}">
        <span class="category-pill__emoji" aria-hidden="true">${c.emoji}</span>${c.label}
      </button>
    `).join("");

    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-pill");
      if (!btn) return;
      wrap.querySelectorAll(".category-pill").forEach((p) => {
        p.classList.remove("is-active");
        p.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      filterTours(btn.dataset.cat);
    });
  }

  function renderTours() {
    const grid = document.getElementById("tourGrid");
    if (!grid) return;
    grid.innerHTML = TOURS.map((t, i) => `
      <article class="tour-card" data-cat="${t.cat}">
        <div class="tour-card__media" style="--tile-bg:${GRADIENTS[i % GRADIENTS.length]}">
          <img class="tour-card__photo" src="${SAMPLE_PHOTOS[(i + 2) % SAMPLE_PHOTOS.length]}" alt="" loading="lazy" onerror="this.remove()">
          <span aria-hidden="true">${t.emoji}</span>
          ${t.badge ? `<span class="tour-card__badge${t.badge === "Bestseller" ? " tour-card__badge--accent" : ""}">${t.badge}</span>` : ""}
          <button type="button" class="tour-card__wishlist" aria-pressed="false" aria-label="Save ${t.title} to wishlist">
            <svg width="17" height="17"><use href="#icon-heart"/></svg>
          </button>
        </div>
        <div class="tour-card__body">
          <p class="tour-card__location"><svg width="12" height="12"><use href="#icon-pin"/></svg> ${t.city}</p>
          <h3 class="tour-card__title">${t.title}</h3>
          <div class="tour-card__meta">
            <span><svg width="14" height="14"><use href="#icon-clock"/></svg>${t.duration}</span>
          </div>
          <div class="tour-card__footer">
            <div class="tour-card__rating"><svg width="14" height="14"><use href="#icon-star"/></svg>${t.rating.toFixed(1)} <small>(${t.reviews.toLocaleString()})</small></div>
            <div class="tour-card__price">From <strong>$${t.price}</strong></div>
          </div>
        </div>
      </article>
    `).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".tour-card__wishlist");
      if (!btn) return;
      const active = btn.classList.toggle("is-active");
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function filterTours(cat) {
    document.querySelectorAll("#tourGrid .tour-card").forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !show);
    });
  }

  /* ============================================================
     Header: sticky shadow + mobile nav
     ============================================================ */
  function initHeader() {
    const header = document.getElementById("siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("menuClose");
    const nav = document.getElementById("mobileNav");
    const backdrop = document.getElementById("mobileNavBackdrop");

    const openMenu = () => {
      nav.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(() => {
        nav.classList.add("is-open");
        backdrop.classList.add("is-open");
      });
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      nav.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      setTimeout(() => { nav.hidden = true; backdrop.hidden = true; }, 300);
    };

    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
    });
  }

  /* ============================================================
     Search form
     ============================================================ */
  function initSearch() {
    const form = document.getElementById("searchForm");
    const hint = document.getElementById("searchHint");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const where = document.getElementById("searchWhere").value.trim();
      hint.textContent = where
        ? `Showing experiences for "${where}" below`
        : "Showing our top-rated experiences below";
      document.getElementById("featured-tours").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ============================================================
     Testimonial carousel
     ============================================================ */
  function initTestimonials() {
    const track = document.getElementById("testimonialTrack");
    const dotsWrap = document.getElementById("testimonialDots");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    if (!track) return;

    track.innerHTML = TESTIMONIALS.map((t) => `
      <div class="testimonial-slide">
        <svg class="testimonial-slide__quote-icon" width="28" height="28"><use href="#icon-quote"/></svg>
        <div class="testimonial-slide__stars">${starRow(t.rating)}</div>
        <blockquote>&ldquo;${t.quote}&rdquo;</blockquote>
        <div class="testimonial-slide__person">
          <span class="testimonial-avatar" style="--avatar-bg:${t.color}">${t.initials}</span>
          <span class="testimonial-slide__meta">
            <span class="testimonial-slide__name">${t.name}</span><br>
            <span class="testimonial-slide__place">${t.place}</span>
          </span>
        </div>
      </div>
    `).join("");

    dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `<button type="button" aria-label="Go to testimonial ${i + 1}"></button>`).join("");

    const slides = [...track.children];
    const dots = [...dotsWrap.children];
    let index = 0;
    let timer;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
      dots.forEach((d, n) => d.classList.toggle("is-active", n === index));
    }

    function next() { show(index + 1); }
    function prev() { show(index - 1); }

    function startAuto() {
      if (reducedMotion) return;
      stopAuto();
      timer = setInterval(next, 6000);
    }
    function stopAuto() { if (timer) clearInterval(timer); }

    nextBtn.addEventListener("click", () => { next(); startAuto(); });
    prevBtn.addEventListener("click", () => { prev(); startAuto(); });
    dots.forEach((d, i) => d.addEventListener("click", () => { show(i); startAuto(); }));

    const carousel = document.getElementById("testimonialCarousel");
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("focusin", stopAuto);
    carousel.addEventListener("focusout", startAuto);

    show(0);
    startAuto();
  }

  /* ============================================================
     Newsletter form
     ============================================================ */
  function initNewsletter() {
    const form = document.getElementById("newsletterForm");
    const status = document.getElementById("newsletterStatus");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletterEmail");
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!valid) {
        status.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }
      status.textContent = `Thanks! We'll send travel inspiration to ${input.value.trim()}.`;
      form.reset();
    });
  }

  /* ============================================================
     Back to top
     ============================================================ */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.hidden = window.scrollY < 500;
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ============================================================
     Scroll reveal
     ============================================================ */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ============================================================
     Stat counters
     ============================================================ */
  function initCounters() {
    const nums = document.querySelectorAll(".stat__num");
    if (!nums.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animate(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      if (reducedMotion) { el.textContent = target.toLocaleString() + suffix; return; }
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach((el) => io.observe(el));
  }

  /* ============================================================
     Init
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    renderDestinations();
    renderCategories();
    renderTours();
    initHeader();
    initSearch();
    initTestimonials();
    initNewsletter();
    initBackToTop();
    initReveal();
    initCounters();
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
