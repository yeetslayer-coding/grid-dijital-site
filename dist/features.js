'use strict';
// Local demonstrations only. Customer videos remain a separate, attributed source.
(() => {
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const selection = window.gridSelection;


  // Inactive panels still reserve the tallest panel's footprint; hidden + inert
  // remove their contents from keyboard navigation and the accessibility tree.
  function setupTabs(root) {
    const tabs = all('[role=tab]', root);
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    root.querySelector('.tab-stack').classList.add('is-ready');
    function select(index, focus = false) {
      tabs.forEach((tab,n) => {
        const active = index === n;
        tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
        panels[n].hidden = !active; panels[n].toggleAttribute('inert', !active);
        panels[n].setAttribute('aria-hidden', String(!active)); panels[n].tabIndex = active ? 0 : -1;
      });
      if (focus) tabs[index].focus({ preventScroll:true });
    }
    tabs.forEach((tab,index) => {
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (['ArrowRight','ArrowDown'].includes(event.key)) next = (index+1)%tabs.length;
        if (['ArrowLeft','ArrowUp'].includes(event.key)) next = (index+tabs.length-1)%tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length-1;
        if (next !== undefined) { event.preventDefault(); select(next,true); }
      });
    });
    select(0);
    return select;
  }
  setupTabs(document.querySelector('[data-tabs=ads]'));
  const selectOutput = setupTabs(document.querySelector('[data-tabs=outputs]'));

  function editBriefIfNeeded() {
    const result = document.querySelector('#brief-result');
    if (!result.hidden) { result.hidden = true; document.querySelector('#brief-form').hidden = false; }
  }
  document.querySelector('#region-map').addEventListener('click', event => {
    const province = event.target.closest('[data-province]');
    if (!province) return;
    selection.setCity(province.dataset.province);
  });
  const mapList = document.querySelector('#map-city-list');
  // Reuse the existing dialog and return focus to the actual opener.
  mapList.addEventListener('click', event => {
    editBriefIfNeeded();
    document.dispatchEvent(new CustomEvent('grid:open-city', { detail:{ trigger:mapList, keyboard:event.detail===0 } }));
  });
  selection.subscribe(state => {
    all('[data-province]').forEach(province => province.classList.toggle('is-selected', province.dataset.province === state.city));
    document.querySelector('#map-selection').textContent = state.city ? `${state.city} seçildi.` : 'Henüz şehir seçilmedi.';
  });
  all('[data-apply-project]').forEach(button => button.addEventListener('click', event => {
    selection.setProject(window.GridLogic.projects[Number(button.dataset.applyProject)]);
    editBriefIfNeeded();
    const target = selection.get().city ? document.querySelector('input[name=project]:checked') : document.querySelector('#city-trigger');
    const instant = event.detail === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector('#brief-form').scrollIntoView({ block:'start', behavior:instant ? 'instant' : 'smooth' });
    target.focus({ preventScroll:true });
  }));

  const outputDialog = document.querySelector('#output-dialog');
  let outputTrigger;
  function outputMotion(event) { outputDialog.toggleAttribute('data-instant', event.detail === 0 || event.type === 'cancel' || document.body.dataset.input === 'keyboard'); }
  all('[data-output]').forEach(button => button.addEventListener('click', event => {
    outputTrigger = button;
    outputMotion(event);
    const index = all('[data-output-tab]').findIndex(tab => tab.dataset.outputTab === button.dataset.output);
    selectOutput(index);
    outputDialog.showModal();
    outputDialog.scrollTop = 0;
    document.querySelectorAll('[data-output-tab]')[index].focus({ preventScroll:true });
  }));
  outputDialog.querySelector('.output-close').addEventListener('click', event => { outputMotion(event); outputDialog.close(); });
  outputDialog.addEventListener('cancel', outputMotion);
  outputDialog.addEventListener('close', () => outputTrigger?.focus({ preventScroll:true }));
  outputDialog.addEventListener('click', event => {
    if (event.target !== outputDialog) return;
    const rect = outputDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) { outputMotion(event); outputDialog.close(); }
  });

  const stages = ['Yeni başvuru','Ön görüşme','Keşif','Teklif'];
  const fixtures = [
    { id:'D-101',city:'İzmir',project:'Konut & villa',note:'Çatı uygunluğu ve keşif',need:'Müstakil ev çatısının GES uygunluğunu öğrenmek ve keşif planlamak.',owner:'Satış danışmanı',stage:0 },
    { id:'D-102',city:'Ankara',project:'Ticari çatı',note:'İşletme çatısı değerlendirmesi',need:'İşletme çatısında GES için çatı alanı, tüketim ve karar sürecini değerlendirmek.',owner:'Proje danışmanı',stage:1 },
    { id:'D-103',city:'Konya',project:'Tarımsal sulama',note:'Sulama ihtiyacı ve saha keşfi',need:'Mevcut pompanın enerji ihtiyacını, sulama dönemini ve saha koşullarını değerlendirmek.',owner:'Saha sorumlusu',stage:2 }
  ];
  const tasks = [
    'İlk görüşmeyi yapın; proje ihtiyacını ve karar yetkisini netleştirin.',
    'Eksik bilgileri tamamlayın; saha ekibiyle uygun keşif zamanını belirleyin.',
    'Keşif notlarını tamamlayın; kapsamı teklif hazırlığı için ilgili ekibe iletin.',
    'Teklifi birlikte değerlendirmek için görüşme planlayın; açık soruları kayda alın.'
  ];
  let records = fixtures.map(record=>({...record})), selectedId = records[0].id;
  const board = document.querySelector('#crm-board');
  const advance = document.querySelector('#crm-advance');
  function renderCRM() {
    all('.crm-column',board).forEach((column,index) => {
      const items = records.filter(record=>record.stage===index);
      column.querySelector('.crm-count').textContent = items.length;
      const list = column.querySelector('.crm-records'); list.replaceChildren();
      items.forEach(record => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'crm-record'; button.dataset.record = record.id;
        button.setAttribute('aria-pressed',String(record.id===selectedId)); button.setAttribute('aria-controls','crm-detail');
        // All values below are fixed fixtures, never visitor-supplied strings.
        button.innerHTML = `<span class="record-top"><span>${record.id}</span><span aria-hidden="true">↗</span></span><strong>${record.city}</strong><span class="record-project">${record.project}</span><span class="record-note">${record.note}</span><span class="record-status">${stages[record.stage]}</span>`;
        list.append(button);
      });
      if (!items.length) { const empty = document.createElement('p'); empty.className='crm-empty'; empty.textContent='Bu aşamada kayıt yok.'; list.append(empty); }
    });
    const selected = records.find(record=>record.id===selectedId);
    document.querySelector('#crm-detail-id').textContent=selected.id;
    document.querySelector('#crm-detail-stage').textContent=stages[selected.stage];
    document.querySelector('#crm-detail-title').textContent=`${selected.city} · ${selected.project}`;
    document.querySelector('#crm-need').textContent=selected.need;
    document.querySelector('#crm-owner').textContent=selected.owner;
    document.querySelector('#crm-task').textContent=tasks[selected.stage];
    advance.disabled=selected.stage===3;
    advance.textContent=selected.stage===3 ? 'Teklif aşamasında' : 'Sonraki aşamaya al →';
    document.querySelector('#crm-end').hidden=selected.stage!==3;
  }
  board.addEventListener('click', event => {
    const record = event.target.closest('[data-record]'); if (!record) return;
    selectedId=record.dataset.record; renderCRM();
    board.querySelector(`[data-record="${selectedId}"]`).focus({preventScroll:true});
    document.querySelector('#crm-status').textContent=`${records.find(record=>record.id===selectedId).city} kaydı seçili.`;
  });
  advance.addEventListener('click', () => {
    const record=records.find(item=>item.id===selectedId); if (record.stage>=3) return;
    record.stage++; renderCRM();
    document.querySelector('#crm-status').textContent=`${record.city} → ${stages[record.stage]}. Sonraki görev güncellendi.`;
    if (record.stage===3) { document.querySelector('#crm-detail-title').tabIndex=-1; document.querySelector('#crm-detail-title').focus({preventScroll:true}); }
  });
  document.querySelector('#crm-reset').addEventListener('click', () => {
    records=fixtures.map(record=>({...record})); selectedId=records[0].id; renderCRM();
    document.querySelector('#crm-status').textContent='Demo başlangıca döndü. Üç temsili kayıt yeniden hazır.';
  });
  renderCRM();

  const analysis = document.querySelector('#startup-analysis');
  const analysisResult = document.querySelector('#analysis-result');
  const analysisError = document.querySelector('#analysis-error');
  const status = document.querySelector('#analysis-status');
  const include = document.querySelector('#analysis-include');
  const remove = document.querySelector('#analysis-remove');
  const answers = () => Object.fromEntries(Object.keys(window.GridLogic.analysisChoices).map(key => [key,analysis.querySelector(`input[name="analysis-${key}"]:checked`)?.value]));
  let displayedAnswers = null;
  analysis.addEventListener('change', event => {
    if (!event.target.matches('input')) return;
    const hadIncluded = selection.get().analysis.length > 0;
    selection.clearAnalysis(); displayedAnswers = null; analysisResult.hidden=true;
    include.disabled=false; remove.hidden=true;
    analysisError.hidden=true;
    all('[aria-invalid]',analysis).forEach(input=>{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');});
    status.textContent = hadIncluded ? 'Yanıtınız değişti. Önceki öneriler notunuzdan çıkarıldı; yeni öncelikleri yeniden ekleyebilirsiniz.' : '';
  });
  document.querySelector('#analysis-run').addEventListener('click', () => {
    const current=answers();
    const priorities=window.GridLogic.analyze(current);
    analysisError.hidden=priorities.length===3;
    if (!priorities.length) {
      const missing=Object.keys(window.GridLogic.analysisChoices).find(key=>!current[key]);
      const inputs=all(`input[name="analysis-${missing}"]`,analysis);
      inputs.forEach(input=>{input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby','analysis-error');});
      inputs[0].focus(); return;
    }
    displayedAnswers=current;
    const list=document.querySelector('#analysis-priorities');list.replaceChildren();
    priorities.forEach(priority=>{
      const item=document.createElement('li'), title=document.createElement('strong'), detail=document.createElement('p');
      title.textContent=priority.title;detail.textContent=priority.text;item.append(title,detail);list.append(item);
    });
    analysisResult.hidden=false;
    include.disabled=selection.get().analysis.length===3;
    remove.hidden=!include.disabled;
    status.textContent=include.disabled ? 'Üç öneri görüşme notunuza eklendi.' : 'Öneriler hazır. Görüşme notunuza eklemek sizin seçiminiz.';
    analysisResult.focus({preventScroll:true});
  });
  include.addEventListener('click',()=>{
    if (!displayedAnswers) return;
    selection.includeAnalysis(displayedAnswers); include.disabled=true;remove.hidden=false;
    status.textContent='Üç öneri görüşme notunuza eklendi.'; remove.focus({preventScroll:true});
  });
  remove.addEventListener('click',()=>{
    selection.clearAnalysis();include.disabled=false;remove.hidden=true;
    status.textContent='Öneriler görüşme notunuzdan çıkarıldı.';include.focus({preventScroll:true});
  });
})();
