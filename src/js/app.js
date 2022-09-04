import './modules/jquery-init';
import {scrollbar} from "./modules/scrollbar";
import './modules/winsize';
import LazyLoad from 'vanilla-lazyload';
import {initSliders} from './modules/_swiper';
import {initIntersectionObserver} from './modules/intersection-observer';
import {$document, Breakpoints, isTouch} from "./constants";
import {modal} from "./modules/modal";
import throttle from './modules/_throttle'
import {inputMask} from "./modules/input-mask";
import {preloaderAnim, secondSection, sectionAnim, sectionContacts} from "./modules/gsap";
import {initCanvasVideo} from "./modules/canvas";



// import isTouch from './libs/detectTouch';
// console.log('Is touch device: ', isTouch());
window.myLazyLoad = new LazyLoad({
  elements_selector: '.lazy',
});

document.addEventListener('DOMContentLoaded', () => {
  preloaderAnim();
  initCanvasVideo();

  // scrollbarInit();
  //section animation
  sectionAnim();
  secondSection();
  sectionContacts();
  //инициализация всех слайдеров
  initSliders()

  //инициализация слайдеров через intersection observer
  initIntersectionObserver()

  //инициализация маски для инпутов
  inputMask();

  document.addEventListener('modal-close', () => {
    inputMask();
  })

  if (window.innerWidth > 1133) {
    const optionsProductItemObserver = {
      rootMargin: '10% 0px 10% 0px',
      threshold: [0.7]
    }

    const productItemObserver = new IntersectionObserver(items => {
      items.forEach(item => {
        if(item.isIntersecting) {
          document.querySelectorAll('.product-item').forEach(el => {el.classList.remove('hover')})
          item.target.classList.add('hover')
        } else if(!item.isIntersecting) {
          item.target.classList.remove('hover')
        }
      })
    }, optionsProductItemObserver)

    document.querySelectorAll('.product-item').forEach(item => {
      productItemObserver.observe(item)
    })
  }




})