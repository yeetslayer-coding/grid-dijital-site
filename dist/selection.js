'use strict';
// Pure selection and analysis rules. No persistence or network side effects.
(() => {
  const cities = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya','Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kırıkkale','Kırklareli','Kırşehir','Kilis','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Şanlıurfa','Şırnak','Tekirdağ','Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak'];
  const projects = ['Konut ve villa GES', 'Ticari ve endüstriyel çatı GES', 'EPC ve GES projeleri', 'Tarımsal sulama GES'];
  const analysisChoices = Object.freeze({ ads: ['none', 'irregular', 'active'], tracking: ['none', 'scattered', 'shared'], response: ['same-day', 'late', 'unknown'], capacity: ['ready', 'limited', 'unclear'] });
  const recommendations = Object.freeze({
    response: { id:'response', title:'İlk dönüşü bir düzene bağlayın.', text:'Yeni başvuruyu karşılayacak kişiyi ve aynı gün içinde dönüş için bir takip adımını belirleyin.' },
    capacity: { id:'capacity', title:'Keşif kapasitenizi netleştirin.', text:'Haftalık keşif takvimini ve sorumlusunu belirleyin; kampanya kapsamını bu kapasiteye göre planlayın.' },
    tracking: { id:'tracking', title:'Başvuruları tek yerde toplayın.', text:'Her kayıt için sorumlu, mevcut aşama ve tarihli bir sonraki görevi ortak tabloda veya CRM’de tutun.' },
    campaign: { id:'campaign', title:'Kampanyaya dar bir odakla başlayın.', text:'Bir bölge ve bir proje türü seçin; reklam mesajını ve başvuru sorularını aynı ihtiyaç etrafında kurun.' },
    qualification: { id:'qualification', title:'Başvuru sorularını netleştirin.', text:'Konum, proje ihtiyacı, karar yetkisi ve zamanlamayı ilk görüşmeden önce öğrenin.' },
    creative: { id:'creative', title:'Kreatifi başvurunun niteliğiyle değerlendirin.', text:'Farklı mesajları deneyin; görseli yalnız tıklanma sayısına göre değil, gelen ihtiyaçlara göre değerlendirin.' },
    review: { id:'review', title:'Haftalık takip toplantısı belirleyin.', text:'Bekleyen ilk dönüşleri, keşifleri ve teklifleri birlikte gözden geçirip her kayıt için sonraki adımı yazın.' }
  });
  function analyze(answers) {
    if (Object.entries(analysisChoices).some(([key, choices]) => !choices.includes(answers[key]))) return [];
    const priorities = [];
    if (answers.response !== 'same-day') priorities.push('response');
    if (answers.capacity !== 'ready') priorities.push('capacity');
    if (answers.tracking !== 'shared') priorities.push('tracking');
    if (answers.ads !== 'active') priorities.push('campaign');
    priorities.push('qualification', 'creative', 'review');
    return priorities.slice(0,3).map(id => ({ ...recommendations[id] }));
  }
  function buildBrief(state) {
    if (!state.city || !state.project) return '';
    const base = `Merhaba Grid Dijital, ${state.city} bölgesinde ${state.project} alanında müşteri kazanımı için görüşmek istiyorum. Bölgesel Talep Sistemi'nin firmamıza uygunluğunu birlikte değerlendirebilir miyiz?`;
    return state.analysis.length ? `${base}\n\nBaşlangıç önceliklerim:\n${state.analysis.map((item, i) => `${i+1}. ${item.title} ${item.text}`).join('\n')}` : base;
  }
  function createSelection() {
    let state = { city:'', project:'', analysis:[] };
    const listeners = new Set();
    const get = () => ({ ...state, analysis:state.analysis.map(item=>({...item})) });
    function update(patch) { state = { ...state, ...patch }; listeners.forEach(listener => listener(get())); }
    return Object.freeze({ get,
      subscribe(listener) { listeners.add(listener); listener(get()); return () => listeners.delete(listener); },
      setCity(city) { if (cities.includes(city)) update({city}); },
      setProject(project) { if (projects.includes(project)) update({project}); },
      includeAnalysis(answers) { const analysis = analyze(answers); if (analysis.length === 3) update({analysis}); },
      clearAnalysis() { if (state.analysis.length) update({analysis:[]}); }
    });
  }
  window.GridLogic = Object.freeze({ cities:Object.freeze(cities), projects:Object.freeze(projects), analysisChoices, analyze, buildBrief, createSelection });
})();
