import './modules/jquery-init';
import './modules/winsize';
import LazyLoad from 'vanilla-lazyload';
import {initSliders} from './modules/_swiper';
import {initIntersectionObserver} from './modules/intersection-observer';
import {$document, Breakpoints, isTouch} from "./constants";
import {modal} from "./modules/modal";
import throttle from './modules/_throttle'
import {inputMask} from "./modules/input-mask";
import {initTabs} from "./modules/tabs";
import {hambInit, tabsSelectInit} from "./modules/hamb";
import {withBreakpoint} from "./constants";


// import isTouch from './libs/detectTouch';
// console.log('Is touch device: ', isTouch());
window.myLazyLoad = new LazyLoad({
  elements_selector: '.lazy',
});

document.addEventListener('DOMContentLoaded', () => {
  //инициализация всех слайдеров
  initSliders()

  //инициализация табов
  initTabs()

  withBreakpoint(hambInit, 768);
  withBreakpoint(tabsSelectInit, 768);

  //инициализация слайдеров через intersection observer
  initIntersectionObserver()

  //инициализация маски для инпутов
  inputMask();

  document.addEventListener('modal-open', () => {
    inputMask();
  })
})