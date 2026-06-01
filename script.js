document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────────────
  // 1. Preloader
  // ──────────────────────────────────────────────
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 500);
    }
  });

  // ──────────────────────────────────────────────
  // 2. Navbar Scroll Effect
  // ──────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);

  // ──────────────────────────────────────────────
  // 3. Mobile Menu Toggle
  // ──────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // ──────────────────────────────────────────────
  // 4. Smooth Scrolling
  // ──────────────────────────────────────────────
  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const top = targetEl.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ──────────────────────────────────────────────
  // 5. Typing Animation
  // ──────────────────────────────────────────────
  const typingEl = document.querySelector('.typing-text');

  if (typingEl) {
    const strings = [
      'A Full Stack Developer',
      'An AI Enthusiast',
      'A Flutter Developer',
      'A Problem Solver',
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const current = strings[stringIndex];

      if (!isDeleting) {
        // Typing forward
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          // Finished typing – pause then start deleting
          isDeleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 100);
      } else {
        // Deleting
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting – pause then move to next string
          isDeleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
          setTimeout(type, 500);
          return;
        }
        setTimeout(type, 50);
      }
    };

    type();
  }

  // ──────────────────────────────────────────────
  // 6. Scroll Reveal Animation
  // ──────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in-up').forEach((el) => revealObserver.observe(el));

  // ──────────────────────────────────────────────
  // 7. Skill Bar Animation
  // ──────────────────────────────────────────────
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          if (width) {
            entry.target.style.width = width;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.skill-progress-fill').forEach((el) => skillObserver.observe(el));

  // ──────────────────────────────────────────────
  // 8. Active Nav Link
  // ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightActiveNav = () => {
    const scrollPos = window.scrollY + NAVBAR_OFFSET + 1;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav);

  // ──────────────────────────────────────────────
  // 9. Back to Top Button
  // ──────────────────────────────────────────────
  const backToTopBtn = document.querySelector('.back-to-top');

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility);

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────────
  // 10. Contact Form — Web3Forms
  // ──────────────────────────────────────────────
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnIcon = submitBtn.querySelector('i');
      const btnText = submitBtn.querySelector('span');
      if (!submitBtn) return;

      // Loading state
      btnIcon.className = 'fas fa-spinner fa-spin';
      btnText.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          // Success
          btnIcon.className = 'fas fa-check';
          btnText.textContent = 'Message Sent!';
          submitBtn.classList.add('success');
          contactForm.reset();

          setTimeout(() => {
            btnIcon.className = 'fas fa-paper-plane';
            btnText.textContent = 'Send Message';
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
          }, 3500);
        } else {
          throw new Error(result.message || 'Something went wrong');
        }
      } catch (err) {
        // Error
        btnIcon.className = 'fas fa-exclamation-triangle';
        btnText.textContent = 'Failed. Try again.';
        submitBtn.style.background = '#ef4444';
        submitBtn.style.borderColor = '#ef4444';

        setTimeout(() => {
          btnIcon.className = 'fas fa-paper-plane';
          btnText.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }, 3500);
      }
    });
  }

  // ──────────────────────────────────────────────
  // 11. Project Card Hover Tilt
  // ──────────────────────────────────────────────
  const MAX_TILT = 5;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // cursor x within card
        const y = e.clientY - rect.top;  // cursor y within card

        // Normalise to -1…1
        const xNorm = (x / rect.width) * 2 - 1;
        const yNorm = (y / rect.height) * 2 - 1;

        // Tilt: Y-axis rotation follows horizontal position, X-axis follows vertical
        const rotateY = xNorm * MAX_TILT;
        const rotateX = -yNorm * MAX_TILT;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  // ──────────────────────────────────────────────
  // 12. Counter Animation
  // ──────────────────────────────────────────────
  const COUNTER_DURATION = 2000; // ms

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const start = performance.now();

    const easeOutQuad = (t) => t * (2 - t);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNTER_DURATION, 1);
      const easedProgress = easeOutQuad(progress);

      el.textContent = Math.floor(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

  // ──────────────────────────────────────────────
  // 13. Particle Background (Hero Section)
  // ──────────────────────────────────────────────
  const hero = document.querySelector('.hero');

  if (hero) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    hero.style.position = hero.style.position || 'relative';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;
    const PARTICLE_COUNT = isMobile ? 20 : isTablet ? 30 : 50;
    const CONNECTION_DISTANCE = isMobile ? 100 : 150;
    const PARTICLE_COLOR = 'rgba(255,102,0,0.3)';
    const LINE_COLOR = 'rgba(255,102,0,0.1)';
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connections
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.fillStyle = PARTICLE_COLOR;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }
});
