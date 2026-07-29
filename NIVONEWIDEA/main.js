import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { brand, locales } from './content.js';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const chapterContainer = document.querySelector('[data-chapters]');
const footer = document.querySelector('[data-footer]');
const caption = document.querySelector('[data-scene-caption]');
const kicker = document.querySelector('[data-scene-kicker]');
const sceneNumber = document.querySelector('[data-scene-number]');
const sceneProgress = document.querySelector('[data-scene-progress]');
const headerChapter = document.querySelector('[data-header-chapter]');
const headerStatus = document.querySelector('.header-status');
const languageSwitch = document.querySelector('[data-language-switch]');
let activeLocale = window.localStorage.getItem('nivo-locale') === 'ar' ? 'ar' : 'en';

function titleMarkup(lines, level) {
  return `<${level}>${lines.map((line) => `<span>${line}</span>`).join('')}</${level}>`;
}

function chapterMarkup(chapter, index, chapters) {
  const headingLevel = index === 0 ? 'h1' : 'h2';
  const target = index < chapters.length - 1 ? `#${chapters[index + 1].id}` : '#top';

  return `
    <section id="${chapter.id}" class="chapter chapter--${chapter.id}" data-chapter="${chapter.id}" data-wardrobe="${chapter.wardrobe}">
      <div class="chapter__content">
        <p class="eyebrow">${chapter.eyebrow}</p>
        ${titleMarkup(chapter.title, headingLevel)}
        <p class="chapter__lede">${chapter.description}</p>
        <p class="chapter__note">${chapter.note}</p>
        <a class="chapter__link" href="${target}"><span>${chapter.label}</span><i aria-hidden="true"></i></a>
      </div>
      <p class="chapter__index" aria-hidden="true">${chapter.number}</p>
    </section>
    ${index < chapters.length - 1 ? '<div class="chapter-divider" aria-hidden="true"><span></span><i></i><span></span></div>' : ''}
  `;
}

function renderContent() {
  const locale = locales[activeLocale];
  chapterContainer.innerHTML = locale.chapters
    .map((chapter, index) => chapterMarkup(chapter, index, locale.chapters))
    .join('');
  footer.innerHTML = `
    <a class="wordmark" href="#top" aria-label="${brand.groupName} home">${brand.name}</a>
    <p>${locale.footer.statement}</p>
    <a class="footer-link" href="#top">${locale.footer.backToTop} <span aria-hidden="true">↗</span></a>
  `;
  document.documentElement.lang = locale.lang;
  document.documentElement.dir = locale.dir;
  document.title = locale.meta.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', locale.meta.description);
  headerStatus.lastChild.textContent = ` ${locale.header.status}`;
  languageSwitch.textContent = locale.header.switchLabel;
  languageSwitch.setAttribute('aria-label', locale.header.switchAria);
}

function setSceneProgress(progress) {
  const normalized = Math.max(0, Math.min(progress, 1));
  document.documentElement.style.setProperty('--story-progress', normalized.toFixed(4));
  sceneProgress.style.transform = `scaleX(${normalized})`;
}

function activateChapter(element) {
  const chapter = locales[activeLocale].chapters.find(
    (item) => item.id === element.dataset.chapter,
  );
  if (!chapter) return;

  document.body.dataset.chapter = chapter.id;
  document.body.dataset.wardrobe = chapter.wardrobe;
  kicker.textContent = `${chapter.number} / ${chapter.id === 'hero' ? brand.name : chapter.id.toUpperCase()}`;
  caption.textContent = chapter.sceneCaption;
  sceneNumber.textContent = chapter.number;
  headerChapter.textContent = `${chapter.number} / 04`;
}

function setupScrollStory() {
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const story = document.querySelector('.chapters');

  activateChapter(chapters[0]);
  ScrollTrigger.create({
    trigger: story,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => setSceneProgress(self.progress),
  });
  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => activateChapter(chapter),
      onEnterBack: () => activateChapter(chapter),
    });
  });
}

function setupSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function changeLanguage() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  activeLocale = activeLocale === 'en' ? 'ar' : 'en';
  window.localStorage.setItem('nivo-locale', activeLocale);
  renderContent();
  setupScrollStory();
  window.scrollTo(0, 0);
}

renderContent();
setupSmoothScroll();
setupScrollStory();
languageSwitch.addEventListener('click', changeLanguage);
