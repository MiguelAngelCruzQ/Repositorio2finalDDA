// JavaScript para la página de Mis Trabajos
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animación de contadores en el hero
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
            setTimeout(updateCounter, 500);
        });
    }

    // 2. Sistema de filtros
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const workItems = document.querySelectorAll('.work-item');
        const searchInput = document.getElementById('searchInput');

        // Filtros por categoría
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                workItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        item.classList.add('show');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('show');
                    }
                });
                
                // Animar la aparición de elementos
                setTimeout(() => {
                    const visibleItems = document.querySelectorAll('.work-item.show');
                    visibleItems.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    });
                }, 100);
            });
        });

        // Búsqueda por texto
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                workItems.forEach(item => {
                    const title = item.querySelector('.work-title').textContent.toLowerCase();
                    const description = item.querySelector('.work-description').textContent.toLowerCase();
                    const techTags = Array.from(item.querySelectorAll('.tech-tag'))
                        .map(tag => tag.textContent.toLowerCase()).join(' ');
                    
                    const searchContent = `${title} ${description} ${techTags}`;
                    
                    if (searchContent.includes(searchTerm)) {
                        item.classList.remove('hidden');
                        item.classList.add('show');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('show');
                    }
                });
            });
        }
    }

    // 3. Efectos de hover mejorados
    function initHoverEffects() {
        const workCards = document.querySelectorAll('.work-card');
        
        workCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Efecto de elevación
                this.style.transform = 'translateY(-20px) scale(1.02)';
                
                // Efecto en la imagen
                const img = this.querySelector('.work-image img');
                if (img) {
                    img.style.transform = 'scale(1.15)';
                }
                
                // Efecto en los tech tags
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-3px)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                const img = this.querySelector('.work-image img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
                
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // 4. Scroll reveal para elementos
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animar contadores cuando entran en vista
                    if (entry.target.classList.contains('hero-stats')) {
                        animateCounters();
                    }
                }
            });
        }, observerOptions);

        // Observar elementos
        document.querySelectorAll('.work-card, .hero-stats, .filters-container').forEach(el => {
            observer.observe(el);
        });
    }

    // 5. Navegación suave
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

    // 6. Efecto de carga de página
    function initPageLoader() {
        // Fade in de elementos principales
        const elementsToAnimate = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats');
        
        elementsToAnimate.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 300);
        });
    }

    // 7. Efectos de partículas de fondo
    function createBackgroundParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(124,196,182,0.4);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 12}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
            `;
            
            heroSection.appendChild(particle);
        }
    }

    // 8. Navegación responsive
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

    // 9. Efecto de escritura para el título
    function initTypewriterEffect() {
        const title = document.querySelector('.hero-title');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // 10. Estadísticas en tiempo real
    function updateStats() {
        const completedProjects = document.querySelectorAll('.work-card:not(.coming-soon)').length;
        const totalProjects = document.querySelectorAll('.work-card').length;
        const technologies = new Set();
        
        document.querySelectorAll('.tech-tag:not(.disabled)').forEach(tag => {
            technologies.add(tag.textContent);
        });
        
        // Actualizar números si es necesario
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers[1]) {
            statNumbers[1].setAttribute('data-target', completedProjects);
        }
        if (statNumbers[2]) {
            statNumbers[2].setAttribute('data-target', technologies.size);
        }
    }

    // Inicializar todas las funciones
    updateStats();
    initFilters();
    initHoverEffects();
    initScrollReveal();
    initSmoothScroll();
    initPageLoader();
    createBackgroundParticles();
    initResponsiveNav();
    // initTypewriterEffect(); // Descomenta si quieres el efecto de escritura

    // Agregar estilos CSS dinámicos
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(30px) rotate(180deg); opacity: 0; }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .work-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-tag {
            transition: transform 0.3s ease;
        }
        
        .bg-particle {
            z-index: 1;
        }
        
        .work-item {
            transition: all 0.4s ease;
        }
        
        .work-item.hidden {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
            pointer-events: none;
        }
        
        .work-item.show {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);

    // Efecto de parallax suave en scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.bg-particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.2 + (index * 0.05);
            const yPos = -(scrolled * speed);
            particle.style.transform = `translateY(${yPos}px)`;
        });
    });
});