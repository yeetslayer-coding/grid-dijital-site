(() => {
  document.querySelectorAll('[data-icon]').forEach(icon => icon.style.setProperty('--icon-url', `url('/assets/icons/${icon.dataset.icon}.svg')`));
  const tabs = [...document.querySelectorAll('[data-direction]')];
  function select(direction, focus = false) {
    if (!['dosya', 'panel'].includes(direction)) direction = 'dosya';
    tabs.forEach(tab => {
      const selected = tab.dataset.direction === direction;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.dataset.direction).hidden = !selected;
      if (selected && focus) tab.focus();
    });
    const url = new URL(location.href);
    url.searchParams.set('yon', direction);
    history.replaceState(null, '', url);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.direction));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = (index + 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next].dataset.direction, true); }
    });
  });
  select(new URL(location.href).searchParams.get('yon') || 'panel');
  const lines = document.querySelectorAll('.production-line');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting)));
    lines.forEach(line => { line.classList.add('is-offscreen'); observer.observe(line); });
  }
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('is-hidden', document.hidden));
})();
