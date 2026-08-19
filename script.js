/**
 * Rubanganth S - Developer Portfolio Interactive Scripts
 * Vanilla JS logic for nav scroll, mobile drawer, scroll animations, project modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selectors ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const toast = document.getElementById('toast');

  // --- Sticky Navbar Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Toggle ---
  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  // --- Active Nav Link Highlight on Scroll ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --- Smooth Scroll & Drawer Auto-Close ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          closeMobileMenu();
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Project Modal Data & Interaction ---
  const projectData = {
    'ai-scholarship-finder': {
      title: 'AI Scholarship Finder',
      category: 'PROJECT 01',
      description: 'An AI-powered platform designed to help students discover suitable scholarship opportunities matching their academic profile, financial background, and career aspirations.',
      tech: ['AI', 'Python', 'Web Development'],
      github: 'https://github.com/rubanganth2007-pixel'
    },
    'ai-interviewer': {
      title: 'AI Interviewer',
      category: 'PROJECT 02',
      description: 'An intelligent interview platform designed to simulate technical interviews, assess candidate responses, and provide real-time feedback to improve candidate preparation.',
      tech: ['AI', 'Frontend', 'Interview System'],
      github: 'https://github.com/rubanganth2007-pixel'
    },
    'todo-list': {
      title: 'To-Do List',
      category: 'PROJECT 03',
      description: 'A simple, intuitive productivity application for creating, managing, prioritizing, and completing daily tasks efficiently.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/rubanganth2007-pixel'
    }
  };

  const projectViewBtns = document.querySelectorAll('.btn-project-view');
  projectViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (data) {
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDescription').textContent = data.description;
        
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        data.tech.forEach(t => {
          const badge = document.createElement('span');
          badge.className = 'tech-badge';
          badge.textContent = t;
          techContainer.appendChild(badge);
        });

        const modalGithub = document.getElementById('modalGithub');
        modalGithub.setAttribute('href', data.github);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Copy Email Toast Notification ---
  window.showToast = function(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };
});
