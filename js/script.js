/**
 * Animation Club - MITS Gwalior
 * INSANELY ANIMATED STUDIO ENGINE
 * Features:
 * - Three.js 3D Floating Wireframe & Shaded Geometric World (Torus knot, Octahedrons, Icosahedrons)
 * - Magnetic Buttons with spring physics
 * - Smooth Custom Cursor with velocity stretching
 * - 3D Perspective Card Tilt Physics
 * - GSAP-grade ScrollTrigger Reveal Transitions
 * - Interactive Sound/Visual feedback & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Render Components from data.js
  renderDomains();
  renderEvents();
  renderGallery();
  renderTeam();
  applyConfigDetails();

  // 3. Ultra Animation Engines
  initThreeHeroWorld();
  setupMagneticButtons();
  setupScrollProgressBar();
  setup3DHeroTilt();
  setupStickyNavbar();
  setupMobileDrawer();
  setupCustomCursor();
  setupScrollReveal();
  setupGalleryFiltersAndLightbox();
  setupContactFormValidation();
  setupBackToTop();
  setupDomainCard3D();
});

/* ==========================================================================
   THREE.JS 3D FLOATING ANIMATION UNIVERSE
   ========================================================================== */
function initThreeHeroWorld() {
  const canvas = document.getElementById('threeHeroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x7928ca, 3, 50);
  pointLight1.position.set(10, 10, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff4d00, 3, 50);
  pointLight2.position.set(-10, -10, 10);
  scene.add(pointLight2);

  // Group of floating animation objects
  const objectsGroup = new THREE.Group();
  scene.add(objectsGroup);

  // 1. Centerpiece: Stylized Torus Knot
  const torusKnotGeo = new THREE.TorusKnotGeometry(2.4, 0.7, 100, 16);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x7928CA,
    metalness: 0.3,
    roughness: 0.2,
    wireframe: true
  });
  const torusKnot = new THREE.Mesh(torusKnotGeo, torusMat);
  torusKnot.position.set(7, 1, 0);
  objectsGroup.add(torusKnot);

  // 2. Floating Icosahedrons & Octahedrons
  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.OctahedronGeometry(1.4, 0),
    new THREE.TetrahedronGeometry(1.1, 0),
    new THREE.TorusGeometry(1.2, 0.4, 16, 50)
  ];

  const colors = [0xFF4D00, 0x00F0FF, 0xFF007F, 0x7928CA, 0xFFB703];

  for (let i = 0; i < 14; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const col = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshStandardMaterial({
      color: col,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: Math.random() > 0.4
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 32,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    const speed = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02,
      floatY: Math.random() * 0.02 + 0.01,
      floatOffset: Math.random() * Math.PI * 2
    };

    objectsGroup.add(mesh);
    shapes.push({ mesh, speed });
  }

  // Interactive mouse tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('resize', () => {
    width = container.offsetWidth;
    height = container.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera inertia
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    objectsGroup.rotation.y = targetX * 0.4;
    objectsGroup.rotation.x = -targetY * 0.4;

    // Torus animation
    torusKnot.rotation.x = elapsedTime * 0.4;
    torusKnot.rotation.y = elapsedTime * 0.6;

    // Floating geometries
    shapes.forEach(({ mesh, speed }) => {
      mesh.rotation.x += speed.rx;
      mesh.rotation.y += speed.ry;
      mesh.position.y += Math.sin(elapsedTime * 2 + speed.floatOffset) * 0.015;
    });

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   MAGNETIC BUTTONS PHYSICS
   ========================================================================== */
function setupMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.magnetic-target, .btn-studio, .brand-logo, .brand-icon-box');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.04)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
function setupScrollProgressBar() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ==========================================================================
   3D HERO CARD TILT PHYSICS
   ========================================================================== */
function setup3DHeroTilt() {
  const container = document.querySelector('.hero-visual-col');
  const card = document.querySelector('.hero-composition');
  if (!container || !card) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  });
}

function setupDomainCard3D() {
  const cards = document.querySelectorAll('.domain-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(600px) rotateX(${-(y / 14)}deg) rotateY(${x / 14}deg) translate(-5px, -5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   CONFIG & DETAILS MAPPING
   ========================================================================== */
function applyConfigDetails() {
  if (typeof CLUB_CONFIG === 'undefined') return;

  const recruitActionBtn = document.getElementById('joinRecruitmentBtn');
  const recruitNotice = document.getElementById('recruitmentStatusNotice');

  if (CLUB_CONFIG.recruitment.isOpen) {
    if (recruitActionBtn) {
      recruitActionBtn.href = CLUB_CONFIG.recruitment.formUrl;
      recruitActionBtn.target = "_blank";
      recruitActionBtn.rel = "noopener noreferrer";
    }
    if (recruitNotice) {
      recruitNotice.innerHTML = `🟢 <strong>Recruitment Active:</strong> Direct application portal open for aspiring MITS creators.`;
    }
  } else {
    const closedText = `<i data-lucide="lock" style="width:18px;height:18px;"></i> Recruitment Closed`;
    if (recruitActionBtn) {
      recruitActionBtn.classList.remove('btn-orange-studio');
      recruitActionBtn.classList.add('btn-outline-studio');
      recruitActionBtn.innerHTML = closedText;
      recruitActionBtn.removeAttribute('href');
      recruitActionBtn.style.cursor = 'not-allowed';
    }
    if (recruitNotice) {
      recruitNotice.innerHTML = `⚠️ <em>${CLUB_CONFIG.recruitment.closedMessage}</em>`;
    }
  }

  // Socials
  document.querySelectorAll('.social-link-instagram').forEach(el => el.href = CLUB_CONFIG.socials.instagram);
  document.querySelectorAll('.social-link-linkedin').forEach(el => el.href = CLUB_CONFIG.socials.linkedin);
  document.querySelectorAll('.social-link-discord').forEach(el => el.href = CLUB_CONFIG.socials.discord);
  document.querySelectorAll('.social-link-youtube').forEach(el => el.href = CLUB_CONFIG.socials.youtube);
  document.querySelectorAll('.social-link-email').forEach(el => el.href = `mailto:${CLUB_CONFIG.socials.email}`);

  // Replace text/placeholder logo with official hand-crafted sketch mascot logo
  const logoBoxes = document.querySelectorAll('.brand-icon-box');
  logoBoxes.forEach(box => {
    box.innerHTML = `<img src="${CLUB_CONFIG.logoUrl || 'assets/images/club-logo.png'}" alt="Animation Club MITS Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
  });

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   RENDERERS (DOMAINS, EVENTS, GALLERY, TEAM)
   ========================================================================== */
function renderDomains() {
  const container = document.getElementById('domainsGrid');
  if (!container || typeof DOMAINS_DATA === 'undefined') return;

  container.innerHTML = DOMAINS_DATA.map((domain, index) => `
    <div class="domain-card reveal" style="transition-delay: ${index * 60}ms;">
      <div class="domain-header">
        <div class="domain-icon-circle">
          <i data-lucide="${domain.icon}"></i>
        </div>
        <span class="domain-num">${domain.number}</span>
      </div>
      <div>
        <h3 class="domain-title">${domain.title}</h3>
        <p class="domain-desc">${domain.desc}</p>
      </div>
      <div class="domain-tags">
        ${domain.tags.map(tag => `<span class="domain-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  setupDomainCard3D();
}

function renderEvents(filter = 'all') {
  const container = document.getElementById('eventsContainer');
  if (!container || typeof EVENTS_DATA === 'undefined') return;

  const filtered = filter === 'all' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(ev => ev.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 4rem 2rem; background: #fff; border-radius: 20px; border: 3px dashed #cbd5e1;">
        <i data-lucide="sparkles" style="width: 52px; height: 52px; color: var(--accent-orange); margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 800; font-size: 1.4rem;">New Workshops Brewing!</h4>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0.5rem auto 0;">Check back soon or follow our Instagram for impromptu campus jamming sessions.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const [featured, ...others] = filtered;

  let html = `
    <!-- Featured Flagship Card -->
    <div class="event-card featured-card reveal">
      <div class="event-poster-wrapper" style="background: ${featured.gradient};">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.55) 100%);"></div>
        <div style="position: relative; z-index: 2; text-align: center;">
          <div style="display:inline-block; font-family: var(--font-mono); font-size: 0.85rem; background: rgba(0,0,0,0.6); padding: 0.4rem 1.1rem; border-radius: 99px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.35); text-transform:uppercase; letter-spacing: 0.08em;">
            ${featured.badge}
          </div>
          <h3 style="font-size: clamp(2rem, 3.5vw, 2.7rem); font-weight: 900; line-height: 1.05; margin-bottom: 0.5rem; text-transform: uppercase;">
            ${featured.title.split('—')[0]}
          </h3>
          <p style="font-family: var(--font-mono); font-size: 0.95rem; color: #ffe4e6; font-weight: 700;">
            ${featured.title.split('—')[1] || featured.category}
          </p>
        </div>
      </div>
      <div class="event-details-wrapper">
        <div>
          <div class="event-meta-line">
            <span class="badge-tag ${featured.status === 'upcoming' ? 'orange' : 'purple'}">
              ${featured.status === 'upcoming' ? 'Upcoming' : 'Completed / Highlights'}
            </span>
            <div class="event-date-item">
              <i data-lucide="calendar"></i>
              <span>${featured.date}</span>
            </div>
            <div class="event-venue-item">
              <i data-lucide="map-pin"></i>
              <span>${featured.venue}</span>
            </div>
          </div>
          <h4 class="event-title">${featured.title}</h4>
          <p class="event-description">${featured.description}</p>
        </div>
        <div class="event-footer-action">
          <a href="${featured.actionLink}" class="btn-studio btn-primary-studio">
            <span>${featured.actionText}</span>
            <i data-lucide="arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  if (others.length > 0) {
    html += `
      <div class="secondary-events-grid">
        ${others.map((ev, idx) => `
          <div class="sub-event-card reveal" style="transition-delay: ${idx * 80}ms;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="badge-tag ${ev.status === 'upcoming' ? 'orange' : 'purple'}">
                  ${ev.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-light); font-weight: bold;">${ev.category}</span>
              </div>
              <h4 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.25;">${ev.title}</h4>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${ev.desc || ev.description}</p>
            </div>
            <div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
                <div style="display:flex; align-items:center; gap: 0.4rem;"><i data-lucide="clock" style="width:15px; height:15px; color: var(--accent-orange);"></i> ${ev.date}</div>
                <div style="display:flex; align-items:center; gap: 0.4rem;"><i data-lucide="map-pin" style="width:15px; height:15px; color: var(--accent-purple);"></i> ${ev.venue}</div>
              </div>
              <a href="${ev.actionLink}" class="btn-studio btn-outline-studio" style="width: 100%; padding: 0.75rem 1rem; font-size: 0.92rem;">
                ${ev.actionText}
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
  setupScrollReveal();
}

function getArtworkSVG(item) {
  const gradients = {
    motion: ['#7928CA', '#FF0080'],
    '3d': ['#FF5500', '#FFB703'],
    posters: ['#08070d', '#6366f1'],
    '2d': ['#db2777', '#f43f5e'],
    memes: ['#16a34a', '#84cc16'],
    art: ['#2563eb', '#00f0ff'],
    edits: ['#d97706', '#ea580c']
  };

  const [col1, col2] = gradients[item.category] || ['#7928CA', '#FF5500'];

  return `
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; display:block; object-fit: cover;">
      <defs>
        <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${col1}" />
          <stop offset="100%" stop-color="${col2}" />
        </linearGradient>
        <pattern id="pat-${item.id}" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.2)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${item.id})" />
      <rect width="100%" height="100%" fill="url(#pat-${item.id})" />
      
      <!-- Graphic Elements -->
      <g opacity="0.9">
        <circle cx="200" cy="160" r="92" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="8,8" />
        <circle cx="200" cy="160" r="56" fill="rgba(255,255,255,0.2)" stroke="#ffffff" stroke-width="2.5" />
        <rect x="150" y="110" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" transform="rotate(45 200 160)" />
      </g>
      
      <text x="200" y="165" font-family="'Clash Display', sans-serif" font-weight="900" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${item.title.toUpperCase()}
      </text>
      <text x="200" y="196" font-family="'Space Mono', monospace" font-size="12" fill="rgba(255,255,255,0.9)" text-anchor="middle" font-weight="bold">
        [ ${item.categoryLabel} ]
      </text>
    </svg>
  `;
}

function renderGallery(filter = 'all') {
  const container = document.getElementById('galleryGrid');
  if (!container || typeof GALLERY_DATA === 'undefined') return;

  const filtered = filter === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === filter);

  container.innerHTML = filtered.map((item, index) => `
    <div class="gallery-card ${item.aspect} reveal" data-id="${item.id}" style="transition-delay: ${index * 60}ms;">
      <div class="gallery-visual-frame">
        <div class="gallery-overlay-badge">
          <span class="badge-tag purple">${item.categoryLabel}</span>
        </div>
        ${getArtworkSVG(item)}
        <div class="gallery-hover-overlay">
          <button class="view-art-btn" aria-label="Inspect ${item.title}">
            <i data-lucide="maximize-2"></i>
            <span>Inspect Artwork</span>
          </button>
        </div>
      </div>
      <div class="gallery-info-bar">
        <h4 class="gallery-work-title">${item.title}</h4>
        <p class="gallery-work-creator">By ${item.author}</p>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  setupScrollReveal();
}

function renderTeam() {
  const container = document.getElementById('teamGrid');
  if (!container || typeof TEAM_SECTIONS === 'undefined') return;

  let html = '';

  // 1. Faculty Coordinators Section
  if (TEAM_SECTIONS.faculty && TEAM_SECTIONS.faculty.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag purple"><i data-lucide="graduation-cap"></i> Faculty Mentorship</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Faculty Coordinators</h3>
        </div>
        <div class="team-cards-row faculty-cards-grid">
          ${TEAM_SECTIONS.faculty.map((member, idx) => `
            <div class="team-card faculty-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="faculty-avatar-top">
                <div class="team-avatar-frame" style="background: linear-gradient(135deg, #ede9fe 0%, #fae8ff 100%);">
                  <i data-lucide="${member.icon || 'graduation-cap'}" style="width: 44px; height: 44px; color: var(--accent-purple);"></i>
                </div>
                <div>
                  <span class="badge-tag orange">${member.badge}</span>
                  <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
                  <div class="team-role">${member.role}</div>
                  <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-light);">${member.dept}</div>
                </div>
              </div>
              <p class="team-bio" style="margin-top: 1rem;">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.email ? `<a href="${member.socials.email}" class="social-pill-btn magnetic-target" aria-label="Email"><i data-lucide="mail"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 2. President Section
  if (TEAM_SECTIONS.president && TEAM_SECTIONS.president.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag orange"><i data-lucide="crown"></i> President</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">President</h3>
        </div>
        <div class="team-cards-row leadership-cards-grid">
          ${TEAM_SECTIONS.president.map((member, idx) => `
            <div class="team-card president-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);">
                <i data-lucide="${member.icon || 'crown'}" style="width: 44px; height: 44px; color: var(--accent-orange);"></i>
              </div>
              <span class="badge-tag orange">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
                ${member.socials.github ? `<a href="${member.socials.github}" class="social-pill-btn magnetic-target" aria-label="GitHub" target="_blank" rel="noopener"><i data-lucide="github"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 3. Vice Presidents Section
  if (TEAM_SECTIONS.vicePresidents && TEAM_SECTIONS.vicePresidents.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag purple"><i data-lucide="shield"></i> Vice Presidents</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Vice Presidents</h3>
        </div>
        <div class="team-cards-row vp-cards-grid">
          ${TEAM_SECTIONS.vicePresidents.map((member, idx) => `
            <div class="team-card vp-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%);">
                <i data-lucide="${member.icon || 'shield'}" style="width: 44px; height: 44px; color: var(--accent-purple);"></i>
              </div>
              <span class="badge-tag purple">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 4. Core Team: Secretary
  if (TEAM_SECTIONS.secretary && TEAM_SECTIONS.secretary.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag orange"><i data-lucide="file-text"></i> Secretary</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Secretary</h3>
        </div>
        <div class="team-cards-row" style="grid-template-columns: repeat(auto-fit, minmax(280px, 380px));">
          ${TEAM_SECTIONS.secretary.map((member, idx) => `
            <div class="team-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);">
                <i data-lucide="${member.icon || 'file-text'}" style="width: 40px; height: 40px; color: var(--accent-orange);"></i>
              </div>
              <span class="badge-tag orange">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 5. Core Team: Treasurers
  if (TEAM_SECTIONS.treasurers && TEAM_SECTIONS.treasurers.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag purple"><i data-lucide="wallet"></i> Treasurers</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Treasurers</h3>
        </div>
        <div class="team-cards-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          ${TEAM_SECTIONS.treasurers.map((member, idx) => `
            <div class="team-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);">
                <i data-lucide="${member.icon || 'wallet'}" style="width: 40px; height: 40px; color: var(--accent-purple);"></i>
              </div>
              <span class="badge-tag purple">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 6. Core Team: Promotions
  if (TEAM_SECTIONS.promotions && TEAM_SECTIONS.promotions.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1; margin-bottom: 2.5rem;">
        <div class="subgroup-badge-title">
          <span class="badge-tag orange"><i data-lucide="megaphone"></i> Promotions & Outreach</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Promotions</h3>
        </div>
        <div class="team-cards-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          ${TEAM_SECTIONS.promotions.map((member, idx) => `
            <div class="team-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);">
                <i data-lucide="${member.icon || 'megaphone'}" style="width: 40px; height: 40px; color: var(--accent-orange);"></i>
              </div>
              <span class="badge-tag orange">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 7. Core Team: Graphic Designing
  if (TEAM_SECTIONS.graphicDesigners && TEAM_SECTIONS.graphicDesigners.length > 0) {
    html += `
      <div class="team-subgroup-wrap reveal" style="grid-column: 1 / -1;">
        <div class="subgroup-badge-title">
          <span class="badge-tag purple"><i data-lucide="palette"></i> Graphic Designing</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem;">Graphic Designing</h3>
        </div>
        <div class="team-cards-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          ${TEAM_SECTIONS.graphicDesigners.map((member, idx) => `
            <div class="team-card reveal" style="transition-delay: ${idx * 80}ms;">
              <div class="team-avatar-frame" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);">
                <i data-lucide="${member.icon || 'palette'}" style="width: 40px; height: 40px; color: var(--accent-pink);"></i>
              </div>
              <span class="badge-tag purple">${member.badge}</span>
              <h3 class="team-name" style="margin-top: 0.4rem;">${member.name}</h3>
              <div class="team-role">${member.role}</div>
              <p class="team-bio">${member.bio}</p>
              <div class="team-social-links">
                ${member.socials.instagram ? `<a href="${member.socials.instagram}" class="social-pill-btn magnetic-target" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-pill-btn magnetic-target" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  // Replace text/placeholder logo with official hand-crafted sketch mascot logo
  const logoBoxes = document.querySelectorAll('.brand-icon-box');
  logoBoxes.forEach(box => {
    box.innerHTML = `<img src="${CLUB_CONFIG.logoUrl || 'assets/images/club-logo.png'}" alt="Animation Club MITS Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
  });

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function setupStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function setupMobileDrawer() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !drawer) return;

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    drawer.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   INTERACTIVE CURSOR
   ========================================================================== */
function setupCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('customCursorDot');

  if (!cursor || !cursorDot || window.matchMedia('(pointer: coarse)').matches) {
    if (cursor) cursor.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const interactiveElements = 'a, button, input, textarea, select, .domain-card, .gallery-card, .team-card, .filter-pill, .tab-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.remove('hovered');
    }
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   GALLERY FILTERS & LIGHTBOX
   ========================================================================== */
function setupGalleryFiltersAndLightbox() {
  const filterPills = document.querySelectorAll('.gallery-filter-btn');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filterVal = pill.getAttribute('data-filter');
      renderGallery(filterVal);
    });
  });

  const eventTabs = document.querySelectorAll('.event-tab-btn');
  eventTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eventTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filterVal = tab.getAttribute('data-event-filter');
      renderEvents(filterVal);
    });
  });

  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const stageEl = document.getElementById('lightboxStage');
  const titleEl = document.getElementById('lightboxTitle');
  const creatorEl = document.getElementById('lightboxCreator');
  const descEl = document.getElementById('lightboxDesc');
  const badgeEl = document.getElementById('lightboxBadge');

  if (!modal) return;

  document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;

    const id = parseInt(card.getAttribute('data-id'), 10);
    const item = GALLERY_DATA.find(d => d.id === id);
    if (!item) return;

    stageEl.innerHTML = getArtworkSVG(item);
    titleEl.textContent = item.title;
    creatorEl.textContent = `Creator: ${item.author}`;
    descEl.textContent = item.desc;
    badgeEl.textContent = item.categoryLabel;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT FORM DISPATCH
   ========================================================================== */
function setupContactFormValidation() {
  const form = document.getElementById('clubContactForm');
  const formStatus = document.getElementById('formStatusMessage');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const domain = document.getElementById('contactDomain').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.innerHTML = `<span style="color: #ef4444; font-weight: 700;">Please fill out all required fields before submitting.</span>`;
      }
      return;
    }

    const mailSubject = encodeURIComponent(`[Animation Club Query] from ${name} (${domain || 'General'})`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nDomain Interest: ${domain}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${CLUB_CONFIG.socials.email}?subject=${mailSubject}&body=${mailBody}`;

    if (formStatus) {
      formStatus.innerHTML = `
        <div style="background: rgba(121, 40, 202, 0.08); padding: 1rem; border-radius: 12px; border: 2px solid var(--accent-purple); color: var(--accent-purple); font-weight: bold;">
          🚀 Opening mail client... Alternatively email directly: <a href="mailto:${CLUB_CONFIG.socials.email}" style="text-decoration:underline;">${CLUB_CONFIG.socials.email}</a>
        </div>
      `;
    }

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  });
}

function setupBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
