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

  const solutions = all('.solution');
  solutions.forEach(item => item.addEventListener('toggle', () => { if (item.open) solutions.forEach(other => { if (other !== item) other.open = false; }); }));

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

  const cities = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya','Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kırıkkale','Kırklareli','Kırşehir','Kilis','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Şanlıurfa','Şırnak','Tekirdağ','Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak'];
  const citySelect = document.querySelector('#city');
  cities.forEach(city => { const option = document.createElement('option'); option.value = city; option.textContent = city; citySelect.append(option); });
  const form = document.querySelector('#brief-form');
  const result = document.querySelector('#brief-result');
  const cityError = document.querySelector('#city-error');
  const projectError = document.querySelector('#project-error');
  citySelect.addEventListener('change', () => { cityError.hidden = true; citySelect.removeAttribute('aria-invalid'); });
  all('input[name=project]').forEach(input => input.addEventListener('change', () => { projectError.hidden = true; all('input[name=project]').forEach(item => { item.removeAttribute('aria-invalid'); item.removeAttribute('aria-describedby'); }); }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const project = form.querySelector('input[name=project]:checked');
    const city = citySelect.value;
    cityError.hidden = !!city; projectError.hidden = !!project;
    citySelect.setAttribute('aria-invalid', String(!city));
    all('input[name=project]').forEach(input => { input.setAttribute('aria-invalid', String(!project)); if (!project) input.setAttribute('aria-describedby', 'project-error'); });
    if (!city || !project) { (!city ? citySelect : form.querySelector('input[name=project]')).focus(); return; }
    const message = `Merhaba Grid Dijital, ${city} bölgesinde ${project.value} alanında müşteri kazanımı için görüşmek istiyorum. Bölgesel Talep Sistemi'nin firmamıza uygunluğunu birlikte değerlendirebilir miyiz?`;
    document.querySelector('#brief-message').textContent = message;
    document.querySelector('#whatsapp-link').href = `https://wa.me/905515062980?text=${encodeURIComponent(message)}`;
    form.hidden = true; result.hidden = false; result.focus();
  });
  document.querySelector('#edit-brief').addEventListener('click', () => { result.hidden = true; form.hidden = false; citySelect.focus(); });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const production = document.querySelector('.production-line');
  const motionToggle = production.querySelector('.motion-toggle');
  motionToggle.addEventListener('click', () => {
    const paused = production.classList.toggle('is-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Bandı oynat' : 'Bandı durdur';
  });
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
