// Portafolio mejorado con animaciones y efectos modernos
document.addEventListener("DOMContentLoaded", () => {
  
  // 1) Animación de contador para estadísticas
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };
      
      // Iniciar animación después de un delay
      setTimeout(updateCounter, 1000);
    });
  }

  // 2) Animación de barras de habilidades
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar .progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute('data-width');
          
          setTimeout(() => {
            progressBar.style.width = width + '%';
          }, 200);
          
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  }

  // 3) Efecto parallax suave en scroll
  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-icon');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // 4) Efecto de escritura mejorado
  function initTypewriter() {
    const codeEl = document.getElementById("codeTyping");
    if (!codeEl) return;
    
    const codeSnippets = [
      "// Desarrollo de Aplicativos",
      "public class MiProyecto {",
      "  public static void main(String[] args) {",
      "    System.out.println('¡Hola Mundo!');",
      "    // Semana por semana aprendiendo",
      "  }",
      "}",
      "",
      "// JavaScript moderno",
      "const aprender = async () => {",
      "  const conocimiento = await estudiar();",
      "  return conocimiento.aplicar();",
      "};"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentLine = codeSnippets[lineIndex];
      
      if (isDeleting) {
        codeEl.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
      } else {
        codeEl.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 30 : 60;
      
      if (!isDeleting && charIndex === currentLine.length) {
        typeSpeed = 2000; // Pausa al final de la línea
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % codeSnippets.length;
        typeSpeed = 500;
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
  }

  // 5) Smooth scroll mejorado
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // 6) Efecto de hover en tarjetas
  function initCardEffects() {
    const cards = document.querySelectorAll('.skill-item, .collage .item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // 7) Navegación responsive mejorada
  function initNavigation() {
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    // Cerrar menú al hacer click en un enlace (móvil)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          navToggler.click();
        }
      });
    });
  }

  // 8) Efecto de carga de página
  function initPageLoader() {
    // Fade in de elementos principales
    const elementsToAnimate = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    
    elementsToAnimate.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  // 9) Partículas interactivas
  function initParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
      // Posición aleatoria inicial
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    });
  }

  // Inicializar todas las funciones
  animateCounters();
  animateSkillBars();
  initParallax();
  initTypewriter();
  initSmoothScroll();
  initCardEffects();
  initNavigation();
  initPageLoader();
  initParticles();

  // Efecto de scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones de scroll
  document.querySelectorAll('.skill-item, .about-img, .collage .item').forEach(el => {
    observer.observe(el);
  });
});
