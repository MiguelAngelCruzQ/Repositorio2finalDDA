// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animación Hero 1 (entrada suave de texto e imagen)
gsap.from(".hero-dark .hero-title, .hero-dark p, .hero-dark ul", {
  scrollTrigger: {
    trigger: ".hero-dark",
    start: "top 80%", // cuando entra a la vista
  },
  opacity: 0,
  y: 50,
  duration: 1.2,
  stagger: 0.3
});

gsap.from(".hero-dark img", {
  scrollTrigger: {
    trigger: ".hero-dark",
    start: "top 80%",
  },
  opacity: 0,
  x: 100,
  duration: 1.5
});

// Animación Hero 2 (tabla aparece con escala tipo "zoom in")
gsap.from(".mi-tabla tr", {
  scrollTrigger: {
    trigger: ".hero-light",
    start: "top 80%",
  },
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  stagger: 0.2
});

// Animación Hero 3 (efecto typing en título)
const title = document.getElementById("typingTitle");
const text = title.textContent;
title.textContent = "";

gsap.to({}, {
  scrollTrigger: {
    trigger: "#typingTitle",
    start: "top 80%",
    once: true
  },
  duration: text.length * 0.05,
  onUpdate: function () {
    const chars = Math.floor(this.progress() * text.length);
    title.textContent = text.substring(0, chars);
  }
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
