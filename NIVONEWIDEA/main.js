import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Add the exported Spline scene at this path when the real Nivo model is ready.
 * Keep null until then: the cinematic CSS stand-in remains visible and no request
 * is made for a missing file.
 */
const NIVO_SCENE_URL = null;

/**
 * Add a real Lottie JSON path here only when a motion asset is approved.
 * The project deliberately ships with no invented animation asset.
 */
const LOTTIE_ASSET_URL = null;

const chapters = [...document.querySelectorAll('[data-chapter]')];
const caption = document.querySelector('[data-scene-caption]');
const kicker = document.querySelector('[data-scene-kicker]');
const sceneNumber = document.querySelector('[data-scene-number]');
const sceneProgress = document.querySelector('[data-scene-progress]');
const splineCanvas = document.querySelector('#nivo-spline-canvas');

const chapterDetails = {
  hero: {
    number: '01',
    label: '01 / BASE NIVO',
    caption: 'The beginning of every direction.',
  },
  advisor: {
    number: '02',
    label: '02 / ADVISOR NIVO',
    caption: 'Glasses and a tie, introduced with intent.',
  },
  it: {
    number: '03',
    label: '03 / IT NIVO',
    caption: 'A different wardrobe for a different chapter.',
  },
  logistics: {
    number: '04',
    label: '04 / LOGISTICS',
    caption: 'The next wardrobe is still to come.',
  },
};

let splineApp = null;

function setSceneProgress(progress) {
  const normalized = Math.max(0, Math.min(progress, 1));
  document.documentElement.style.setProperty('--story-progress', normalized.toFixed(4));
  sceneProgress.style.transform = `scaleX(${normalized})`;

  // An exported Spline scene can consume this variable to mirror the browser scroll.
  // Configure a Number variable named "scrollProgress" in Spline (0–1).
  if (splineApp && typeof splineApp.setVariable === 'function') {
    splineApp.setVariable('scrollProgress', normalized);
  }
}

function activateChapter(element) {
  const chapter = element.dataset.chapter;
  const wardrobe = element.dataset.wardrobe;
  const details = chapterDetails[chapter];

  document.body.dataset.chapter = chapter;
  document.body.dataset.wardrobe = wardrobe;
  kicker.textContent = details.label;
  caption.textContent = details.caption;
  sceneNumber.textContent = details.number;
}

function setupScrollStory() {
  const story = document.querySelector('.chapters');

  ScrollTrigger.create({
    trigger: story,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => setSceneProgress(self.progress),
  });

  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 52%',
      end: 'bottom 52%',
      onEnter: () => activateChapter(chapter),
      onEnterBack: () => activateChapter(chapter),
    });
  });
}

function setupSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

async function setupSpline() {
  if (!NIVO_SCENE_URL) return;

  try {
    const { Application } = await import('@splinetool/runtime');
    splineApp = new Application(splineCanvas);
    await splineApp.load(NIVO_SCENE_URL);
    splineCanvas.classList.add('is-ready');
    setSceneProgress(
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--story-progress'),
      ) || 0,
    );
  } catch {
    // Keep the already-visible image fallback in place if an exported scene is unavailable.
    document.body.dataset.spline = 'unavailable';
  }
}

async function setupLottie() {
  if (!LOTTIE_ASSET_URL) return;

  const { default: lottie } = await import('lottie-web');
  lottie.loadAnimation({
    container: document.querySelector('.scroll-cue i'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: LOTTIE_ASSET_URL,
  });
}

setupSmoothScroll();
setupScrollStory();
setupSpline();
setupLottie();
