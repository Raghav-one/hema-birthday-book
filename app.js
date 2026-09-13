const cover = document.querySelector('#cover');
const stage = document.querySelector('#book-stage');
const surprise = document.querySelector('#surprise');
const pages = [...document.querySelectorAll('.page')];
const indicator = document.querySelector('#page-indicator');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
let spread = 0;

function isMobile() { return matchMedia('(max-width: 720px)').matches; }
function renderSpread() {
  pages.forEach(page => page.classList.remove('show'));
  const start = isMobile() ? spread : spread * 2;
  const count = isMobile() ? 1 : 2;
  pages.slice(start, start + count).forEach(page => page.classList.add('show'));
  const first = start + 1;
  const last = Math.min(start + count, pages.length);
  indicator.textContent = `page${count > 1 ? 's' : ''} ${first}${count > 1 ? `–${last}` : ''} of ${pages.length}`;
  prev.disabled = spread === 0;
  next.disabled = start + count >= pages.length;
}

document.querySelector('#open-book').addEventListener('click', () => {
  cover.classList.add('hiding');
  setTimeout(() => { cover.hidden = true; stage.hidden = false; renderSpread(); surprise.showModal(); }, 380);
});
document.querySelector('#close-surprise').addEventListener('click', () => surprise.close());
document.querySelector('#continue').addEventListener('click', () => surprise.close());
surprise.addEventListener('pointermove', event => {
  const x = (event.clientX / innerWidth - .5) * 20;
  const y = (event.clientY / innerHeight - .5) * 13;
  surprise.style.setProperty('--look-x', `${x}px`);
  surprise.style.setProperty('--look-y', `${y}px`);
});
prev.addEventListener('click', () => { if (spread > 0) { spread--; renderSpread(); } });
next.addEventListener('click', () => { const increment = isMobile() ? 1 : 2; if ((isMobile() ? spread : spread * 2) + increment < pages.length) { spread++; renderSpread(); } });
addEventListener('resize', () => { spread = 0; if (!stage.hidden) renderSpread(); });
