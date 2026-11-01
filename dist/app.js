'use strict';
// The public preview intentionally has no tracking, remote lead submission or stored form data.
(() => {
  const all = (query, root = document) => [...root.querySelectorAll(query)];
  document.addEventListener('keydown', () => { document.body.dataset.input = 'keyboard'; });
  document.addEventListener('pointerdown', () => { document.body.dataset.input = 'pointer'; }, { passive: true });
  all('[data-icon]').forEach(icon => icon.style.setProperty('--icon-url', `url('/assets/icons/${icon.dataset.icon}.svg')`));

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('#navigation');
  function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  all('a', navigation).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
  const mobileMedia = window.matchMedia('(max-width:767px)');
  mobileMedia.addEventListener('change', () => closeMenu());

  const tabs = all('.stage-tab');
  const panels = all('.stage-panel');
  function selectStage(index, focus = false) {
    tabs.forEach((tab, n) => {
      const selected = n === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[n].hidden = !selected;
      panels[n].toggleAttribute('inert', !selected);
      panels[n].setAttribute('aria-hidden', String(!selected));
      panels[n].tabIndex = selected ? 0 : -1;
    });
    if (focus) tabs[index].focus();
  }
  selectStage(0);
  document.querySelector('.stage-panels').classList.add('tabs-ready');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStage(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
      if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectStage(next, true); }
    });
  });

  const stories = Object.freeze({
    j4m6kfkmXHY: { title:'Suntep Solar: "10 Keşiften 9\'unu Satışa Çeviriyoruz" | Grid Dijital Müşteri Deneyimi', solution:'GES müşteri kazanım sistemi', href:'https://griddijital.com/tr/hizmetler/ges-musteri-edinim-sistemi/' },
    '0laH1mUQchY': { title:'Family Group Enerji: "Reklamlar Açıldığı Gün Talep Akışı Başladı" | Grid Dijital Müşteri Deneyimi', solution:'GES Meta reklamları', href:'https://griddijital.com/tr/hizmetler/ges-meta-reklamlari/' },
    D6cYJVJP8fY: { title:'2 Haftada 33 Keşif Randevusu | Grid Dijital Müşteri Deneyimi', solution:'GES müşteri kazanım sistemi', href:'https://griddijital.com/tr/hizmetler/ges-musteri-edinim-sistemi/' },
    Gw3Y4yd2K7w: { title:'Bir Arçelik Bayisinin Grid Dijital Deneyimi | Müşteri Referansı', solution:'Grid Dijital yaklaşımı', href:'https://griddijital.com/tr/hakkimizda/' }
  });
  const dialog = document.querySelector('#video-dialog');
  const videoContainer = document.querySelector('#video-container');
  let videoTrigger;
  function clearVideo() { videoContainer.replaceChildren(); videoTrigger?.focus(); }
  function modalInput(event) { dialog.toggleAttribute('data-instant', event.detail === 0 || event.type === 'cancel' || document.body.dataset.input === 'keyboard'); }
  all('[data-video]').forEach(button => button.addEventListener('click', event => {
    modalInput(event);
    videoTrigger = button;
    const video = button.dataset.video;
    const title = button.dataset.title;
    document.querySelector('#video-title').textContent = title;
    const story = stories[video];
    document.querySelector('#video-official-title').textContent = story.title;
    const solution = document.querySelector('#video-solution');
    solution.textContent = story.solution + ' ↗';
    solution.href = story.href;
    document.querySelector('#video-fallback').href = `https://www.youtube.com/watch?v=${video}`;
    const iframe = document.createElement('iframe');
    iframe.title = `${title} müşteri deneyimi videosu`;
    iframe.src = `https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    videoContainer.replaceChildren(iframe);
    dialog.showModal();
  }));
  dialog.querySelector('.close-dialog').addEventListener('click', event => { modalInput(event); dialog.close(); });
  dialog.addEventListener('cancel', modalInput);
  dialog.addEventListener('close', clearVideo);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) { modalInput(event); dialog.close(); }
    }
  });

  const cities = window.GridLogic.cities;
  const selection = window.GridLogic.createSelection();
  window.gridSelection = selection;
  const citySelect = document.querySelector('#city');
  cities.forEach(city => { const option = document.createElement('option'); option.value = city; option.textContent = city; citySelect.append(option); });
  const form = document.querySelector('#brief-form');
  const result = document.querySelector('#brief-result');
  const cityError = document.querySelector('#city-error');
  const projectError = document.querySelector('#project-error');
  const cityTrigger = document.querySelector('#map-city-list');
  const cityDialog = document.querySelector('#city-dialog');
  const citySearch = document.querySelector('#city-search');
  const cityResults = document.querySelector('#city-results');
  const cityEmpty = cityDialog.querySelector('.city-empty');
  const cityCount = document.querySelector('#city-result-count');
  const summary = document.querySelector('#selection-summary');
  const normalizeCity = value => value.trim().toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');

  function updateSelection(state) {
    citySelect.value = state.city;
    all('input[name=project]', form).forEach(input => { input.checked = input.value === state.project; });
    const selected = form.querySelector('input[name=project]:checked');
    summary.classList.toggle('has-selection', !!state.city || !!selected);
    summary.querySelector('span').textContent = state.city || selected
      ? `${state.city || 'Şehir seçin'} · ${selected?.closest('label').querySelector('strong').textContent || 'Proje türü seçin'}`
      : 'Şehir ve proje türünü seçin.';
    if (state.city) { cityError.hidden = true; citySelect.removeAttribute('aria-invalid'); cityTrigger.removeAttribute('aria-invalid'); cityTrigger.setAttribute('aria-describedby', 'map-selection'); }
    if (selected) { projectError.hidden = true; all('input[name=project]').forEach(input => { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }); }
    const message = window.GridLogic.buildBrief(state);
    document.querySelector('#brief-message').textContent = message;
    document.querySelector('#whatsapp-link').href = `https://wa.me/905515062980?text=${encodeURIComponent(message)}`;
  }
  selection.subscribe(updateSelection);
  function cityMotion(event) {
    cityDialog.toggleAttribute('data-instant', event.detail === 0 || event.type === 'cancel' || document.body.dataset.input === 'keyboard');
  }
  function focusCity(index) {
    const buttons = all('.city-option', cityResults);
    if (!buttons.length) return;
    const next = Math.max(0, Math.min(index, buttons.length - 1));
    buttons.forEach((button, n) => { button.tabIndex = n === next ? 0 : -1; });
    buttons[next].focus();
    buttons[next].scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
  }
  function renderCities() {
    const query = normalizeCity(citySearch.value);
    const matches = cities.filter(city => normalizeCity(city).includes(query));
    const selectedIndex = Math.max(0, matches.indexOf(citySelect.value));
    const fragment = document.createDocumentFragment();
    matches.forEach((city, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      const name = document.createElement('span');
      const check = document.createElement('i');
      name.textContent = city;
      check.className = 'icon'; check.setAttribute('aria-hidden', 'true');
      check.style.setProperty('--icon-url', "url('/assets/icons/check.svg')");
      button.className = 'city-option'; button.type = 'button'; button.dataset.city = city;
      button.tabIndex = index === selectedIndex ? 0 : -1;
      button.setAttribute('aria-pressed', String(city === citySelect.value));
      button.append(name, check); item.append(button); fragment.append(item);
    });
    cityResults.replaceChildren(fragment);
    cityResults.scrollTop = 0;
    cityEmpty.hidden = matches.length > 0;
    cityResults.hidden = matches.length === 0;
    cityCount.textContent = matches.length ? `${matches.length} şehir` : 'Sonuç bulunamadı';
  }
  function openCity(event) {
    result.hidden = true;
    form.hidden = false;
    cityMotion(event);
    citySearch.value = '';
    renderCities();
    cityDialog.showModal();
    cityTrigger.setAttribute('aria-expanded', 'true');
    citySearch.focus();
  }
  cityTrigger.addEventListener('click', event => openCity(event));
  citySearch.addEventListener('input', renderCities);
  citySearch.addEventListener('keydown', event => {
    if (event.isComposing) return;
    const buttons = all('.city-option', cityResults);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); focusCity(event.key === 'ArrowDown' ? 0 : buttons.length - 1);
    } else if (event.key === 'Enter' && buttons.length === 1) {
      event.preventDefault(); buttons[0].click();
    }
  });
  cityResults.addEventListener('keydown', event => {
    const index = all('.city-option', cityResults).indexOf(event.target);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowDown') next = index + 1;
    if (event.key === 'ArrowUp') next = index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = cityResults.children.length - 1;
    if (next !== undefined) { event.preventDefault(); focusCity(next); }
  });
  cityResults.addEventListener('click', event => {
    const button = event.target.closest('.city-option');
    if (!button || !cities.includes(button.dataset.city)) return;
    cityMotion(event);
    citySelect.value = button.dataset.city;
    citySelect.dispatchEvent(new Event('change', { bubbles: true }));
    cityDialog.close();
  });
  all('.city-close,.city-cancel', cityDialog).forEach(button => button.addEventListener('click', event => { cityMotion(event); cityDialog.close(); }));
  cityDialog.addEventListener('cancel', cityMotion);
  cityDialog.addEventListener('close', () => {
    if (cityDialog.open) return;
    cityTrigger.setAttribute('aria-expanded', 'false');
    cityTrigger.focus();
  });
  cityDialog.addEventListener('click', event => {
    if (event.target !== cityDialog) return;
    const rect = cityDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) { cityMotion(event); cityDialog.close(); }
  });
  citySelect.addEventListener('change', () => selection.setCity(citySelect.value));
  all('input[name=project]').forEach(input => input.addEventListener('change', () => selection.setProject(input.value)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const project = form.querySelector('input[name=project]:checked');
    const city = citySelect.value;
    cityError.hidden = !!city; projectError.hidden = !!project;
    citySelect.setAttribute('aria-invalid', String(!city));
    cityTrigger.setAttribute('aria-invalid', String(!city));
    cityTrigger.setAttribute('aria-describedby', city ? 'map-selection' : 'map-selection city-error');
    all('input[name=project]').forEach(input => { input.setAttribute('aria-invalid', String(!project)); if (!project) input.setAttribute('aria-describedby', 'project-error'); });
    if (!city || !project) { (!city ? cityTrigger : form.querySelector('input[name=project]')).focus(); return; }
    form.hidden = true; result.hidden = false; result.focus();
  });
  document.querySelector('#edit-brief').addEventListener('click', () => {
    result.hidden = true; form.hidden = false;
    (form.querySelector('input[name=project]:checked') || form.querySelector('input[name=project]')).focus();
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const production = document.querySelector('.production-line');
  if ('IntersectionObserver' in window) {
    production.classList.add('is-offscreen');
    const conveyorObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => production.classList.toggle('is-offscreen', !entry.isIntersecting));
    });
    conveyorObserver.observe(production);
  }
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    all('.reveal').forEach((element, index) => { element.style.setProperty('--reveal-delay', `${(index % 2) * 75}ms`); observer.observe(element); });
    reduced.addEventListener('change', event => { if (event.matches) { observer.disconnect(); document.documentElement.classList.remove('js-reveal'); } });
  }
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('is-hidden', document.hidden));
})();
