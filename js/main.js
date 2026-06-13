document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { text: '$ si-sistemas iniciar', cls: 'prompt' },
    { text: '> Cargando módulo de clientes...', cls: 'cmt' },
    { text: '> Cargando módulo de stock...', cls: 'cmt' },
    { text: '> Cargando módulo de facturación...', cls: 'cmt' },
    { text: '✓ Sistema listo. 0 errores.', cls: 'ok' },
    { text: '', cls: '' },
    { text: '$ trial --duracion 7d', cls: 'prompt' },
    { text: '✓ Versión de prueba activada.', cls: 'ok' },
    { text: '> Probá el sistema sin límites', cls: 'cmt' },
    { text: '> durante una semana completa.', cls: 'cmt' },
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    body.innerHTML = lines.map(l => `<span class="${l.cls}">${l.text}</span>`).join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let current = document.createElement('span');
  current.className = lines[0].cls;
  body.appendChild(current);

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  body.appendChild(cursor);

  function type() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        body.innerHTML = '';
        lineIndex = 0;
        charIndex = 0;
        current = document.createElement('span');
        current.className = lines[0].cls;
        body.appendChild(current);
        body.appendChild(cursor);
        type();
      }, 2200);
      return;
    }

    const line = lines[lineIndex];

    if (charIndex < line.text.length) {
      current.textContent += line.text[charIndex];
      body.insertBefore(cursor, null);
      charIndex++;
      setTimeout(type, 18 + Math.random() * 28);
    } else {
      body.insertBefore(document.createElement('br'), cursor);
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) {
        current = document.createElement('span');
        current.className = lines[lineIndex].cls;
        body.insertBefore(current, cursor);
      }
      setTimeout(type, line.text === '' ? 80 : 260);
    }
  }

  type();
});

// Hamburguesa
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
