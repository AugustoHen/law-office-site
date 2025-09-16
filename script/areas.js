
  function closeAllMenus() {
    const menu = document.querySelector('#primary-nav ul');
    const btn = document.querySelector('.hamburger');

    
    if (menu) menu.classList.remove('active');
    if (btn) btn.setAttribute('aria-expanded', 'false');


    document.querySelectorAll('.submenu.open').forEach(sm => sm.classList.remove('open'));
    document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.has-submenu.hover').forEach(li => li.classList.remove('hover'));
  }

  function toggleMenu() {
    const menu = document.querySelector('#primary-nav ul');
    const btn = document.querySelector('.hamburger');
    if (!menu) return;
    const open = menu.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');


    if (!open) {
      document.querySelectorAll('.submenu.open').forEach(sm => sm.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function toggleSubmenu(e){
    e.stopPropagation();
    const parent = e.currentTarget.closest('.has-submenu');
    if (!parent) return;
    const submenu = parent.querySelector('.submenu');
    if (!submenu) return;
    const open = submenu.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const item = document.querySelector('li.has-submenu');

  
    closeAllMenus();

  
    if (item) {
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 840) item.classList.add('hover');
      });
      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 840) item.classList.remove('hover');
      });
    }

 
    document.querySelectorAll('#primary-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 840) closeAllMenus();
      });
    });

 
    let lastW = window.innerWidth;
    window.addEventListener('resize', () => {
      const w = window.innerWidth;

      if ((lastW <= 840 && w > 840) || (lastW > 840 && w <= 840)) {
        closeAllMenus();
      }
      lastW = w;
    });


    document.addEventListener('click', (e) => {
      const nav = document.getElementById('primary-nav');
      const burger = document.querySelector('.hamburger');
      if (!nav) return;
      const clickInside = nav.contains(e.target) || (burger && burger.contains(e.target));
      if (!clickInside && window.innerWidth <= 840) {
        closeAllMenus();
      }
    });
  });

