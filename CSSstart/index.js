// small script to create lines in linesContainer and typing background effect,
// plus smooth scroll to "sobre-mi" and highlight nav items when clicked

document.addEventListener("DOMContentLoaded", () => {
  // 1) Generar líneas (5px de radio? interpretado como visual: lineas de grosor 2px y small rounded ends)
  const linesContainer = document.getElementById("linesContainer");
  if (linesContainer) {
    // crea 4 líneas
    for (let i = 0; i < 4; i++) {
      const l = document.createElement("div");
      l.className = "line";
      linesContainer.appendChild(l);
    }
  }

  // 2) Código tipeándose en background
  const codeEl = document.getElementById("codeTyping");
  const codeSnippets = [
    "const fetchData = async () => {",
    "  try {",
    "    const res = await fetch('/api/data');",
    "    return await res.json();",
    "  } catch (e) {",
    "    console.error(e);",
    "  }",
    "}",
    "",
    "function render(){ /* render UI */ }",
    "render();"
  ];

  // typing effect
  let lineIndex = 0;
  let charIndex = 0;
  let typingSpeed = 18; // ms per char (fast subtle)
  function typeLoop() {
    if (!codeEl) return;
    if (lineIndex >= codeSnippets.length) {
      // fade out whole block then restart
      setTimeout(() => {
        codeEl.style.opacity = 0;
        setTimeout(() => {
          codeEl.textContent = "";
          codeEl.style.opacity = 1;
          lineIndex = 0;
          charIndex = 0;
          setTimeout(typeLoop, 500);
        }, 800);
      }, 1600);
      return;
    }
    const current = codeSnippets[lineIndex];
    if (charIndex <= current.length) {
      codeEl.textContent = codeSnippets.slice(0, lineIndex).join("\n") + (lineIndex ? "\n" : "") + current.slice(0, charIndex) + (charIndex % 2 ? "|" : " ");
      charIndex++;
      setTimeout(typeLoop, typingSpeed);
    } else {
      // line complete: small pause, then next line
      charIndex = 0;
      lineIndex++;
      setTimeout(typeLoop, 250);
    }
  }
  typeLoop();

  // 3) Smooth scroll for anchor links (sobre-mi, mis-trabajos, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function(e){
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // highlight nav active if applicable
        document.querySelectorAll('.navbar .nav-link').forEach(n => n.classList.remove('active'));
        const navMatch = document.querySelector(`.navbar .nav-link[href="#${targetId}"]`);
        if (navMatch) navMatch.classList.add('active');
      }
    });
  });

  // 4) Optional: give navbar dropdown items selection behavior
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // close collapse on small screens
      const nav = document.querySelector('.navbar-collapse');
      if (nav && nav.classList.contains('show')) {
        // bootstrap collapse toggle
        const bsCollapse = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, {toggle:false});
        bsCollapse.hide();
      }
    });
  });
});
