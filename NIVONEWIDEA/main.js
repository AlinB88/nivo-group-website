import { brand, locales } from './content.js';
import './styles.css';

const chapterContainer = document.querySelector('[data-chapters]');
const footer = document.querySelector('[data-footer]');
const caption = document.querySelector('[data-scene-caption]');
const kicker = document.querySelector('[data-scene-kicker]');
const sceneNumber = document.querySelector('[data-scene-number]');
const sceneProgress = document.querySelector('[data-scene-progress]');
const headerChapter = document.querySelector('[data-header-chapter]');
const headerStatus = document.querySelector('.header-status');
const languageSwitch = document.querySelector('[data-language-switch]');
const storyNavigation = document.querySelector('[data-story-nav]');
const skipLink = document.querySelector('[data-skip-link]');
const homeLink = document.querySelector('[data-home-link]');
const sceneShell = document.querySelector('[data-scene-shell]');
const languageAnnouncement = document.querySelector('[data-language-announcement]');
const localeFromUrl = new URLSearchParams(window.location.search).get('lang');
let activeLocale =
  localeFromUrl === 'ar'
    ? 'ar'
    : localeFromUrl === 'en'
      ? 'en'
      : window.localStorage.getItem('nivo-locale') === 'ar'
        ? 'ar'
        : 'en';

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
    <a class="wordmark" href="#top" aria-label="${locale.accessibility.home}">${brand.name}</a>
    <p>${locale.footer.statement}</p>
    <a class="footer-link" href="#top">${locale.footer.backToTop} <span aria-hidden="true">↗</span></a>
  `;
  chapterContainer.append(footer);
  document.documentElement.lang = locale.lang;
  document.documentElement.dir = locale.dir;
  document.title = locale.meta.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', locale.meta.description);
  headerStatus.lastChild.textContent = ` ${locale.header.status}`;
  skipLink.textContent = locale.accessibility.skip;
  homeLink.setAttribute('aria-label', locale.accessibility.home);
  sceneShell.setAttribute('aria-label', locale.accessibility.scene);
  languageSwitch.setAttribute('aria-label', locale.header.switchAria);
  languageSwitch.setAttribute('title', locale.header.switchAria);
  languageSwitch.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.25"></circle>
      <path d="M3.9 12h16.2M12 3.75c2.25 2.3 3.4 5.05 3.4 8.25S14.25 17.95 12 20.25C9.75 17.95 8.6 15.2 8.6 12S9.75 6.05 12 3.75Z"></path>
    </svg>
    <span class="visually-hidden">${locale.header.switchAria}</span>
  `;
  storyNavigation.setAttribute('aria-label', locale.accessibility.chapterNavigation);
  chapterContainer.setAttribute('aria-label', locale.accessibility.chapterNavigation);
  storyNavigation.innerHTML = locale.chapters
    .map(
      (chapter) => `
        <a href="#${chapter.id}" data-story-link="${chapter.id}" aria-label="${chapter.number}: ${chapter.title.join(' ')}">
          <span>${chapter.number}</span><i aria-hidden="true"></i>
        </a>`,
    )
    .join('');
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
  document.querySelectorAll('[data-story-link]').forEach((link) => {
    link.toggleAttribute('aria-current', link.dataset.storyLink === chapter.id);
  });
}

function getChapters() {
  return [...chapterContainer.querySelectorAll('[data-chapter]')];
}

function scrollToChapter(index, behavior = 'smooth') {
  const chapters = getChapters();
  const target = chapters[Math.max(0, Math.min(index, chapters.length - 1))];
  if (!target) return;

  chapterContainer.scrollTo({
    left: target.offsetLeft,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : behavior,
  });
}

function updateHorizontalStory() {
  const chapters = getChapters();
  const maxScroll = chapterContainer.scrollWidth - chapterContainer.clientWidth;
  const progress = maxScroll > 0 ? chapterContainer.scrollLeft / maxScroll : 0;
  const chapterIndex = Math.min(
    chapters.length - 1,
    Math.max(0, Math.round(chapterContainer.scrollLeft / chapterContainer.clientWidth)),
  );

  setSceneProgress(progress);
  if (chapters[chapterIndex]) activateChapter(chapters[chapterIndex]);
}

function setupHorizontalStory() {
  activateChapter(getChapters()[0]);
  updateHorizontalStory();

  document.addEventListener(
    'wheel',
    (event) => {
      const travel =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!travel) return;
      event.preventDefault();
      chapterContainer.scrollBy({ left: travel, behavior: 'auto' });
    },
    { passive: false },
  );
  chapterContainer.addEventListener('scroll', updateHorizontalStory, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const currentIndex = Math.round(
      chapterContainer.scrollLeft / chapterContainer.clientWidth,
    );
    const actions = {
      ArrowRight: () => scrollToChapter(currentIndex + 1),
      ArrowLeft: () => scrollToChapter(currentIndex - 1),
      PageDown: () => scrollToChapter(currentIndex + 1),
      PageUp: () => scrollToChapter(currentIndex - 1),
      Home: () => scrollToChapter(0),
      End: () => scrollToChapter(getChapters().length - 1),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute('href');
    if (targetId === '#chapters') {
      event.preventDefault();
      chapterContainer.focus({ preventScroll: true });
      return;
    }
    if (targetId === '#top') {
      event.preventDefault();
      scrollToChapter(0);
      return;
    }
    const targetIndex = getChapters().findIndex(
      (chapter) => `#${chapter.id}` === targetId,
    );
    if (targetIndex < 0) return;
    event.preventDefault();
    scrollToChapter(targetIndex);
  });
}

function changeLanguage() {
  const updateLanguage = () => {
    activeLocale = activeLocale === 'en' ? 'ar' : 'en';
    window.localStorage.setItem('nivo-locale', activeLocale);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', activeLocale);
    window.history.replaceState({}, '', nextUrl);
    renderContent();
    chapterContainer.scrollTo({ left: 0, behavior: 'auto' });
    updateHorizontalStory();
    languageAnnouncement.textContent =
      locales[activeLocale].accessibility.languageAnnouncement;
  };

  if (
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    document.startViewTransition(updateLanguage);
    return;
  }

  updateLanguage();
}

renderContent();
setupHorizontalStory();
languageSwitch.addEventListener('click', changeLanguage);
