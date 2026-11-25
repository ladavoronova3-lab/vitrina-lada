/* ---------- данные работ ---------- */
const WORKS = {
  remont: {
    title: 'Стекло и ремонт', niche: 'ремонтная бригада · деловой стиль', img: 'assets/works/remont.png',
    desc: 'Сайт бригады мастеров: душевые кабины и перегородки из стекла плюс ремонт квартир и домов. Спокойный деловой стиль: план работ до старта, фото-отчёт каждый день, телефон мастера в один клик.',
    tags: ['деловой стиль','стекольные работы','фото-отчёты','живой сайт'],
    link: 'https://kimiremont1.vercel.app/'
  },
  lapki: {
    title: 'Лапки и Пена', niche: 'груминг-студия · эмоциональный стиль', img: 'assets/works/lapki.png',
    desc: 'Студия груминга для собак и кошек. Эмоциональный стиль: мятная нежность, парящие блобы на фоне, прайс с вкладками «собаки / кошки» и запись в один клик.',
    tags: ['эмоциональный стиль','прайс с вкладками','запись онлайн','живой сайт'],
    link: 'https://turbo-octo-pancake-five.vercel.app/'
  },
  dallas: {
    title: 'Dallas', niche: 'барбершоп · деловой стиль', img: 'assets/works/dallas.jpg',
    desc: 'Тёмный фон, золото и крупная типографика: характер мужской территории читается с первого экрана. Хит-предложение — «стрижка + борода» — сразу внизу героя.',
    tags: ['деловой стиль','хит-предложение','круговая надпись']
  },
  pion: {
    title: 'Пион & Co', niche: 'цветочная мастерская · эмоциональный стиль', img: 'assets/works/pion.jpg',
    desc: 'Арочное фото, бордовый курсив и чек-лист доверия: только свежие цветы дня, конструктор букета от стебля, открытка с вашим текстом в каждый заказ.',
    tags: ['эмоциональный стиль','конструктор букета','чек-лист доверия']
  },
  diana: {
    title: 'Диана', niche: 'личный бренд · деловой стиль', img: 'assets/works/diana.jpg',
    desc: 'Личный бренд на контрасте: чёрный фон, крупный белый заголовок и живое фото эксперта. Доверие к человеку — с первых секунд, задача обсуждается в один клик.',
    tags: ['деловой стиль','личный бренд','ИИ-услуги']
  },
  podarki: {
    title: 'Подарки с любовью', niche: 'новогодние композиции · эмоциональный стиль', img: 'assets/works/podarki.jpg',
    desc: 'Глубокий зелёный и кремовая типографика: праздничное настроение ручной работы. Каталог композиций и заказ набора лично под близких.',
    tags: ['эмоциональный стиль','сезонный оффер','доставка за день']
  },
  upetra: {
    title: 'У Петра', niche: 'торты на заказ · эмоциональный стиль', img: 'assets/works/upetra.jpg',
    desc: 'Тёмная подача с веером фото десертов: торт собирается под повод, а не наоборот. За день до выдачи заказчик получает фото именно своего торта.',
    tags: ['эмоциональный стиль','веер фото','фото перед выдачей']
  }
};

/* ---------- модалка ---------- */
const modal = document.getElementById('modal');
let lastFocus = null;
function openWork(key){
  const w = WORKS[key]; if(!w) return;
  document.getElementById('modal-img').src = w.img;
  document.getElementById('modal-img').alt = 'Сайт: ' + w.title;
  document.getElementById('modal-niche').textContent = w.niche;
  document.getElementById('modal-title').textContent = w.title;
  document.getElementById('modal-desc').textContent = w.desc;
  document.getElementById('modal-tags').innerHTML = w.tags.map((t,i)=>
    '<span class="tag'+(i===0?' hl':'')+'">'+t+'</span>').join('');
  const link = document.getElementById('modal-link');
  if(w.link){ link.href = w.link; link.style.display = 'inline-flex'; }
  else { link.style.display = 'none'; }
  lastFocus = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}
function closeWork(){
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocus) lastFocus.focus();
}
document.querySelectorAll('.work').forEach(b=>b.addEventListener('click',()=>openWork(b.dataset.work)));
modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeWork));
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('open')) closeWork(); });

/* ---------- reveal ---------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); } });
},{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ---------- hero: вход + вес букв от курсора ---------- */
const hero = document.querySelector('.hero');
const title = document.getElementById('hero-title');
requestAnimationFrame(()=>hero.classList.add('in'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion && title){
  const accent = title.querySelector('.lime');
  const accentText = accent ? accent.textContent : null;
  const plain = title.textContent;
  title.textContent = plain;
  title.innerHTML = plain.split(' ').map(w=>{
    const isAccent = accentText && w.includes(accentText.replace(/<[^>]*>/g,''));
    return '<span class="w'+(isAccent?' lime':'')+'">'+w+'</span>';
  }).join(' ');
  const spans = title.querySelectorAll('.w');
  if(!accentText && spans.length) spans[spans.length-1].classList.add('lime');
  let raf = null;
  window.addEventListener('pointermove',e=>{
    if(raf) return;
    raf = requestAnimationFrame(()=>{
      raf = null;
      spans.forEach((s)=>{
        const r = s.getBoundingClientRect();
        const d = Math.abs(e.clientX-(r.left+r.width/2));
        const wght = Math.max(200, Math.min(900, 900 - d*0.9));
        s.style.fontVariationSettings = "'wght' "+Math.round(wght);
      });
    });
  },{passive:true});
}

/* ---------- счётчики ---------- */
const ioCount = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    ioCount.unobserve(en.target);
    const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix||'';
    const t0 = performance.now(), dur = 1400;
    (function tick(t){
      const p = Math.min(1,(t-t0)/dur), ease = 1-Math.pow(1-p,3);
      el.textContent = Math.round(end*ease)+suf;
      if(p<1) requestAnimationFrame(tick);
    })(t0);
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>ioCount.observe(el));

/* ---------- бегущая строка: дублируем для бесшовности ---------- */
const track = document.getElementById('marquee-track');
track.innerHTML += track.innerHTML;

/* ---------- калькулятор ---------- */
const calcState = { type: 15000, style: 0, speed: 0 };
const priceEl = document.getElementById('calc-price');
function fmt(n){ return n.toLocaleString('ru-RU'); }
function calcUpdate(){
  const sum = calcState.type + calcState.style + calcState.speed;
  priceEl.textContent = 'от ' + fmt(sum) + ' ₽';
}
document.querySelectorAll('.chips').forEach(group=>{
  const key = group.dataset.group;
  group.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      group.querySelectorAll('.chip').forEach(c=>c.classList.remove('sel'));
      chip.classList.add('sel');
      calcState[key] = +chip.dataset.price;
      calcUpdate();
    });
  });
});
calcUpdate();
