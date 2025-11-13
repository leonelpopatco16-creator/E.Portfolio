// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('show');
  });
  // Close nav on link click (mobile)
  siteNav.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName === 'A') {
      siteNav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll for internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Data
const skills = [
  'HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git', 'Problem Solving'
];

const projects = [
  {
    title: 'Portfolio Website',
    desc: 'A clean, responsive personal site to showcase my work and certificates.',
    links: [{ label: 'View', href: '#projects' }]
  },
  {
    title: 'Landing Page UI',
    desc: 'Modern hero layout with accessible navigation and mobile-first CSS.',
    links: []
  },
  {
    title: 'JS Utilities',
    desc: 'Small vanilla JS helpers for DOM interactions and UX enhancements.',
    links: []
  }
];

// Populate skills
const skillsList = document.getElementById('skillsList');
if (skillsList) {
  skillsList.innerHTML = '';
  skills.forEach((s) => {
    const pill = document.createElement('span');
    pill.className = 'skill-pill';
    pill.textContent = s;
    skillsList.appendChild(pill);
  });
}

// Populate projects
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  projectsGrid.innerHTML = '';
  projects.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const h3 = document.createElement('h3');
    h3.className = 'project-title';
    h3.textContent = p.title;
    const desc = document.createElement('p');
    desc.className = 'project-desc';
    desc.textContent = p.desc;

    card.appendChild(h3);
    card.appendChild(desc);

    if (p.links && p.links.length) {
      const links = document.createElement('div');
      links.className = 'project-links';
      p.links.forEach((l) => {
        const a = document.createElement('a');
        a.href = l.href;
        a.textContent = l.label;
        a.target = l.href.startsWith('http') ? '_blank' : '';
        a.rel = a.target === '_blank' ? 'noopener' : '';
        links.appendChild(a);
      });
      card.appendChild(links);
    }

    projectsGrid.appendChild(card);
  });
}

// Certificates: probe known filenames in assets/certificates.
const certsGrid = document.getElementById('certsGrid');
const certCount = document.getElementById('certCount');

async function urlExists(url) {
  try {
    // Some static servers may block HEAD; try HEAD then fall back to GET
    let res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      res = await fetch(url, { method: 'GET', cache: 'no-store' });
    }
    return res.ok;
  } catch {
    return false;
  }
}

(async () => {
  if (!certsGrid || !certCount) return;
  const candidates = ['ES.PNG', 'intro.PNG', 'PMI.jfif', 'nel.jfif'];
  const found = [];
  for (const file of candidates) {
    const path = `assets/certificates/${file}`;
    // eslint-disable-next-line no-await-in-loop
    if (await urlExists(path)) {
      found.push(path);
    }
  }

  certsGrid.innerHTML = '';
  found.forEach((src) => {
    const wrap = document.createElement('div');
    wrap.className = 'cert';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Certificate';
    wrap.appendChild(img);
    certsGrid.appendChild(wrap);
  });

  certCount.innerHTML = `Found ${found.length} certificate image(s) in <code>assets/certificates</code>.`;
})();
