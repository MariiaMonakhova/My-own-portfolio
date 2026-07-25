import "./styles.css";
import { projects, recentProjects, skillGroups, socials, sportSlides, themes } from "./data.ts";

// Per-theme "About" portraits
import avatarDefault from "../images/avatar.jpg";
import avatarFatale from "../images/avatar-fatale.jpg";
import avatarWater from "../images/avatar-water.jpg";

/* ------------------------------------------------------------------ *
 *  Small DOM helpers
 * ------------------------------------------------------------------ */
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  html?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

/* ------------------------------------------------------------------ *
 *  Render: skills
 * ------------------------------------------------------------------ */
function renderSkills(): void {
  const grid = $("#skills-grid");
  if (!grid) return;

  skillGroups.forEach((group, gi) => {
    const card = el("article", "skill-card reveal");
    card.style.setProperty("--delay", `${gi * 70}ms`);

    const header = el(
      "header",
      "skill-card__head",
      `<span class="skill-card__icon"><i class="${group.icon}"></i></span>
       <h3>${group.title}</h3>`,
    );
    card.appendChild(header);

    const list = el("ul", "skill-chips");
    group.skills.forEach((skill) => {
      const li = el("li", `skill-chip${skill.featured ? " is-featured" : ""}`);
      li.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
      list.appendChild(li);
    });
    card.appendChild(list);
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------------ *
 *  Render: projects
 * ------------------------------------------------------------------ */
function renderProjectGrid(selector: string, list: typeof projects): void {
  const grid = $(selector);
  if (!grid) return;

  list.forEach((p, i) => {
    const card = el("article", "project-card reveal");
    card.style.setProperty("--delay", `${i * 80}ms`);
    card.innerHTML = `
      <a class="project-card__media" href="${p.link}" target="_blank" rel="noopener" title="Open ${p.title}">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="project-card__launch"><i class="fa-solid fa-arrow-up-right-from-square"></i> Launch</span>
      </a>
      <div class="project-card__body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <ul class="project-card__tags">
          ${p.tags.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>`;
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------------ *
 *  Render: social links (one or more containers)
 * ------------------------------------------------------------------ */
function renderSocials(): void {
  document.querySelectorAll<HTMLElement>("[data-socials]").forEach((container) => {
    socials.forEach((s) => {
      const a = el("a");
      a.href = s.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.title = s.label;
      a.setAttribute("aria-label", s.label);
      a.innerHTML = `<i class="${s.icon}"></i>`;
      container.appendChild(a);
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Carousel (sports / beyond code)
 * ------------------------------------------------------------------ */
function setupCarousel(): void {
  const track = $("#carousel-track");
  const dotsWrap = $("#carousel-dots");
  if (!track || !dotsWrap) return;

  sportSlides.forEach((slide, i) => {
    const item = el("div", "slide");

    const media = slide.image
      ? `<div class="slide__bg" style="background-image:url('${slide.image}')"></div>
         <img class="slide__img" src="${slide.image}" alt="${slide.title}" loading="lazy" />`
      : "";
    item.innerHTML = `
      <div class="slide__fallback"><i class="${slide.icon}"></i></div>
      ${media}
      <div class="slide__overlay">
        <span class="slide__badge"><i class="${slide.icon}"></i> ${slide.title}</span>
        <p>${slide.caption}</p>
      </div>`;

    // No photo (or it fails to load) → gracefully fall back to the icon panel.
    if (!slide.image) {
      item.classList.add("slide--no-img");
    } else {
      const img = item.querySelector<HTMLImageElement>(".slide__img")!;
      img.addEventListener("error", () => item.classList.add("slide--no-img"));
      if (img.complete && img.naturalWidth === 0) item.classList.add("slide--no-img");
    }

    track.appendChild(item);

    const dot = el("button", "carousel-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to ${slide.title}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const slides = Array.from(track.children) as HTMLElement[];
  const dots = Array.from(dotsWrap.children) as HTMLElement[];
  let index = 0;
  let timer: number | undefined;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update(): void {
    track!.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function goTo(i: number): void {
    index = (i + slides.length) % slides.length;
    update();
    restart();
  }
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  function restart(): void {
    if (reduceMotion) return;
    window.clearInterval(timer);
    timer = window.setInterval(next, 5000);
  }

  $("#carousel-next")?.addEventListener("click", next);
  $("#carousel-prev")?.addEventListener("click", prev);

  const viewport = $("#carousel-viewport");
  viewport?.addEventListener("mouseenter", () => window.clearInterval(timer));
  viewport?.addEventListener("mouseleave", restart);

  // Touch / swipe support
  let startX = 0;
  viewport?.addEventListener("touchstart", (e) => (startX = e.touches[0]!.clientX), { passive: true });
  viewport?.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0]!.clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  });

  // Keyboard support when the carousel is focused
  viewport?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  update();
  restart();
}

/* ------------------------------------------------------------------ *
 *  Scroll reveal animations
 * ------------------------------------------------------------------ */
function setupReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>(".reveal, [data-reveal]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  targets.forEach((t) => io.observe(t));
}

/* ------------------------------------------------------------------ *
 *  Navigation: scroll progress, shrink-on-scroll, active link, menu
 * ------------------------------------------------------------------ */
function setupNav(): void {
  const nav = $("#nav");
  const progress = $("#scroll-progress");
  const toggle = $("#menu-toggle");
  const links = $("#nav-links");

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  toggle?.addEventListener("click", () => {
    const open = links?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(!!open));
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );

  // Active link highlighting via section observation
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
  const navAnchors = new Map<string, Element>();
  links?.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((a) =>
    navAnchors.set(a.getAttribute("href")!.slice(1), a),
  );
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.remove("is-active"));
        navAnchors.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { threshold: 0.5 },
  );
  sections.forEach((s) => spy.observe(s));
}

/* ------------------------------------------------------------------ *
 *  Hero: subtle parallax glow that follows the cursor
 * ------------------------------------------------------------------ */
function setupHeroGlow(): void {
  const hero = $("#hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
}

/* ------------------------------------------------------------------ *
 *  Animated sparkles — ambient twinkling field + gentle cursor trail
 * ------------------------------------------------------------------ */
function setupSparkles(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = el("div", "sparkle-layer");
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const tones = ["pink", "lavender", "milk"];
  const make = (x: number, y: number, ephemeral: boolean): HTMLElement => {
    const s = el("span", `sparkle sparkle--${tones[Math.floor(Math.random() * tones.length)]}`);
    // Mostly small, but ~1 in 4 ambient sparkles are noticeably larger for variety.
    const big = !ephemeral && Math.random() < 0.28;
    const size = ephemeral
      ? 9 + Math.random() * 12
      : big
        ? 22 + Math.random() * 16
        : 6 + Math.random() * 10;
    s.style.left = `${x}%`;
    s.style.top = `${y}%`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.setProperty("--rot", `${Math.random() * 90 - 45}deg`);
    return s;
  };

  // Ambient field — fixed twinkling sparkles across the viewport.
  const COUNT = window.innerWidth < 640 ? 22 : 42;
  for (let i = 0; i < COUNT; i++) {
    const s = make(Math.random() * 100, Math.random() * 100, false);
    s.style.animationDuration = `${4 + Math.random() * 5}s`;
    s.style.animationDelay = `${-Math.random() * 7}s`;
    layer.appendChild(s);
  }

  // Gentle cursor trail — a sparkle every so often as the pointer moves.
  let last = 0;
  window.addEventListener(
    "pointermove",
    (e) => {
      const now = e.timeStamp;
      if (now - last < 90) return;
      last = now;
      const s = make((e.clientX / window.innerWidth) * 100, (e.clientY / window.innerHeight) * 100, true);
      s.classList.add("sparkle--burst");
      layer.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    },
    { passive: true },
  );
}

/* ------------------------------------------------------------------ *
 *  "Alter Ego" theme picker (bottom of page) — persisted in localStorage
 * ------------------------------------------------------------------ */
function setupTheme(): void {
  const root = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const container = $("#theme-options");
  const valid = new Set(themes.map((t) => t.key));
  const bgFor = (key: string): string => themes.find((t) => t.key === key)?.swatch[0] ?? "#f5efe8";

  // Build an "M" favicon coloured with the theme's gradient.
  const faviconHref = (key: string): string => {
    const t = themes.find((x) => x.key === key);
    const c1 = t?.swatch[1] ?? "#c89bd6";
    const c2 = t?.swatch[2] ?? "#a98fd6";
    const mark = key === "femmefatale" ? "#ffffff" : "#2a1f2e";
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
      `<stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/>` +
      `</linearGradient></defs>` +
      `<rect width='100' height='100' rx='24' fill='url(#g)'/>` +
      `<text x='50' y='52' font-family='Arial,Helvetica,sans-serif' font-size='66' ` +
      `font-weight='800' fill='${mark}' text-anchor='middle' dominant-baseline='central'>M</text>` +
      `</svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  };

  const setFavicon = (href: string): void => {
    document.querySelectorAll('link[rel="icon"]').forEach((n) => n.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = href;
    document.head.appendChild(link);
  };

  const photo = $<HTMLImageElement>(".about__photo img");
  const avatarFor = (key: string): string =>
    key === "femmefatale" ? avatarFatale : key === "tidal" ? avatarWater : avatarDefault;

  const apply = (key: string): void => {
    root.setAttribute("data-theme", key);
    if (meta) meta.content = bgFor(key);
    setFavicon(faviconHref(key));
    if (photo) photo.src = avatarFor(key);
    container?.querySelectorAll<HTMLElement>(".theme-dot").forEach((b) => {
      const active = b.dataset.themeKey === key;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  };

  // Render a compact dot per theme into the fixed dock.
  themes.forEach((t) => {
    const b = el("button", "theme-dot");
    b.type = "button";
    b.dataset.themeKey = t.key;
    b.title = `${t.emoji} ${t.name}`;
    b.setAttribute("aria-label", t.name);
    b.setAttribute("aria-pressed", "false");
    b.style.background = `linear-gradient(135deg, ${t.swatch[1]} 0%, ${t.swatch[2]} 100%)`;
    b.addEventListener("click", () => {
      try {
        localStorage.setItem("theme", t.key);
      } catch {
        /* ignore storage errors (private mode) */
      }
      apply(t.key);
    });
    container?.appendChild(b);
  });

  // The inline <head> script set data-theme before paint; honour it / storage.
  const fromAttr = root.getAttribute("data-theme");
  const stored = (() => {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  })();
  const initial =
    stored && valid.has(stored)
      ? stored
      : fromAttr && valid.has(fromAttr)
        ? fromAttr
        : "daydream";
  apply(initial);
}

/* ------------------------------------------------------------------ *
 *  Boot
 * ------------------------------------------------------------------ */
function main(): void {
  setupTheme();
  renderSkills();
  renderProjectGrid("#recent-projects-grid", recentProjects);
  renderProjectGrid("#projects-grid", projects);
  renderSocials();
  setupCarousel();
  setupReveal();
  setupNav();
  setupHeroGlow();
  setupSparkles();

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
