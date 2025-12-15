// JavaScript moderno para las páginas de semanas
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Animaciones de entrada
  function initAnimations() {
    // Animación del hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 200);
    }

    // Animación de las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card, .concept-card, .feature-card');
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  }

  // 2. Efectos de hover mejorados
  function initHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .concept-card, .feature-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(124,196,182,0.3)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      });
    });
  }

  // 3. Animación de números/estadísticas
  function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .metric-number');
    
    numbers.forEach(number => {
      const target = parseInt(number.textContent);
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current);
      }, 30);
    });
  }

  // 4. Efecto de escritura para código
  function initTypewriterEffect() {
    const codeElements = document.querySelectorAll('.code-content pre code');
    
    codeElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      let i = 0;
      
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 20);
        }
      };
      
      // Iniciar después de un delay
      setTimeout(typeWriter, 1000);
    });
  }

  // 5. Partículas flotantes
  function createFloatingParticles() {
    const heroSection = document.querySelector('.hero-gradient');
    if (!heroSection) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(124,196,182,0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      
      heroSection.appendChild(particle);
    }
  }

  // 6. Scroll reveal para elementos
  function initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animar números cuando entran en vista
          if (entry.target.classList.contains('stat-card') || 
              entry.target.classList.contains('metric')) {
            animateNumbers();
          }
        }
      });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.project-card, .concept-card, .feature-card, .stat-card, .metric').forEach(el => {
      observer.observe(el);
    });
  }

  // 7. Navegación suave
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

  // 8. Efecto parallax suave
  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.float-item, .floating-particle');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // 9. Responsive navigation
  function initResponsiveNav() {
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navToggler && navCollapse) {
      document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (navCollapse.classList.contains('show')) {
            navToggler.click();
          }
        });
      });
    }
  }

  // 10. Loading animation
  function initPageLoader() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  }

  // Inicializar todas las funciones
  initAnimations();
  initHoverEffects();
  initTypewriterEffect();
  createFloatingParticles();
  initScrollReveal();
  initSmoothScroll();
  initParallax();
  initResponsiveNav();
  initPageLoader();

  // Agregar estilos CSS dinámicos para las animaciones
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
    }
    
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .project-card, .concept-card, .feature-card {
      transition: all 0.3s ease;
    }
    
    .floating-particle {
      z-index: 1;
    }
  `;
  document.head.appendChild(style);
});
// Generador de lluvia de código estilo Matrix
const codeFall = document.getElementById("codeFall");
const chars = "01{}<>[];=+*/";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

setInterval(() => {
  const span = document.createElement("span");
  span.textContent = randomChar();
  span.style.position = "absolute";
  span.style.left = Math.random() * window.innerWidth + "px";
  span.style.top = "-20px";
  codeFall.appendChild(span);

  gsap.to(span, {
    y: window.innerHeight + 50,
    opacity: 0,
    duration: 3,
    ease: "linear",
    onComplete: () => span.remove()
  });
}, 100);
document.addEventListener('DOMContentLoaded', () => {
  const codeFall = document.getElementById('codeFall');
  if (!codeFall) return; // si no existe, salimos

  // caracteres que quieres mostrar (ajusta)
  const chars = ['0','1','{','}','[',']','<','>','/','=','+','-',';','(',')','#'];
  const spawnInterval = 120; // ms entre nuevos caracteres
  const minDur = 2.5; // segundos min
  const maxDur = 5.0; // segundos max
  const maxSpans = 160; // límite máximo de spans en DOM para no saturar

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function spawn() {
    // evita demasiados elementos si el usuario no los limpia rápido
    if (codeFall.children.length > maxSpans) return;

    const span = document.createElement('span');
    span.textContent = randomChar();

    // posición horizontal aleatoria en vw (se adapta al ancho)
    const leftVW = Math.random() * 100;
    span.style.left = leftVW + 'vw';

    // tamaño y opacidad aleatoria para variar la estética
    const fontSize = 10 + Math.random() * 14; // px
    span.style.fontSize = fontSize + 'px';
    span.style.opacity = (0.6 + Math.random() * 0.4).toString();

    // duración de la caída (aleatoria)
    const dur = minDur + Math.random() * (maxDur - minDur);
    span.style.animation = `fall ${dur}s linear forwards`;

    // pequeño desplazamiento horizontal (simula viento)
    const drift = (Math.random() - 0.5) * 30; // px
    span.style.transform = `translateX(${drift}px)`;

    codeFall.appendChild(span);

    // eliminar el span después de que termine la animación
    setTimeout(() => {
      if (span && span.parentNode) span.parentNode.removeChild(span);
    }, (dur + 0.15) * 1000);
  }

  // Iniciar la generación
  const intervalId = setInterval(spawn, spawnInterval);

  // Opcional: pausar la lluvia si la sección no está visible para ahorrar CPU
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // si la sección está visible, reiniciamos el intervalo (si no está activo)
        if (!intervalId || typeof intervalId === 'undefined') {
          // no hacemos nada; intervalId está en scope superior
        }
      } else {
        // cuando la sección no está visible podrías pausar creando una señal
        // (en este snippet mantenemos simple, pero podríamos clearInterval aquí)
      }
    });
  }, { threshold: 0 });

  // Si quieres observar el contenedor de la sección:
  // observer.observe(document.querySelector('.hero-light'));

  // Nota: si quieres detener todo en algún momento:
  // clearInterval(intervalId);
});
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const images = carousel.querySelectorAll("img");
  const total = images.length;
  const angle = 360 / total; // ángulo entre cada imagen
  const radius = 200; // distancia al centro (ajusta este valor)

  images.forEach((img, i) => {
    const rot = angle * i;
    img.style.transform = `rotateY(${rot}deg) translateZ(${radius}px)`;
  });
});
