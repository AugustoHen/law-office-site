
const fadeInElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeInElements.length) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fadeInElements.forEach(el => io.observe(el));
} else {
  fadeInElements.forEach(el => el.classList.add('visible'));
}


function checkVisibility() {
  const teamSection = document.querySelector('.team');
  if (!teamSection) return;

  const rect = teamSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    teamSection.classList.add('visible');
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
      setTimeout(() => member.classList.add('visible'), index * 300);
    });
    window.removeEventListener('scroll', checkVisibility, { passive: true });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  checkVisibility();
  window.addEventListener('scroll', checkVisibility, { passive: true });
});


function getMenuUL() {

  const byId = document.querySelector('#primary-nav ul');
  if (byId) return byId;
  return document.querySelector('header nav ul');
}

function closeMenuAndSub() {
  const menu = getMenuUL();
  const btn = document.querySelector('.hamburger');
  if (menu) menu.classList.remove('active');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  const menu = getMenuUL();
  const btn = document.querySelector('.hamburger');
  if (!menu) return;
  const open = menu.classList.toggle('active');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}


document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('header nav a, #primary-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 840) closeMenuAndSub();
    });
  });


  document.addEventListener('click', (e) => {
    const nav = document.getElementById('primary-nav') || document.querySelector('header nav');
    const burger = document.querySelector('.hamburger');
    const inside = (nav && nav.contains(e.target)) || (burger && burger.contains(e.target));
    if (!inside && window.innerWidth <= 840) closeMenuAndSub();
  });


  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    if ((lastW <= 840 && w > 840) || (lastW > 840 && w <= 840)) {
      closeMenuAndSub();
    }
    lastW = w;
  });
});
