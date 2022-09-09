import Swiper, { EffectFade, Navigation, Pagination, Scrollbar, Mousewheel, FreeMode, Controller } from 'swiper';
import LazyLoad from "vanilla-lazyload";
import {withBreakpoint} from "../constants";

export function initSliders () {
  document.querySelectorAll('.hero-slider').forEach(el => {
    const swiperContianer = el.querySelector('.swiper');
    const prevBtn = el.querySelector('.swiper-button-prev');
    const nextBtn = el.querySelector('.swiper-button-next');
    const pagination = el.querySelector('.swiper-pagination');

    const swiper = new Swiper(swiperContianer, {
      modules: [Navigation],
      allowTouchMove: false,
      speed: 700,
      loop: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      },
      on: {
        slideChange: (swiper) => {
          const current = swiper.el.querySelector('.swiper-pagination-current');
          const allSlides = swiper.el.querySelector('.swiper-pagination-all');
          const slides = swiper.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');

          console.log(swiper)

          current.innerText = `0${swiper.realIndex + 1}`
          allSlides.innerText = `0${slides.length}`
        }
      }
    })
  })

  document.querySelectorAll('.category__tabs-content').forEach(el => {
    const swiperContianer = el.querySelector('.swiper');
    const prevBtn = el.querySelector('.swiper-button-prev');
    const nextBtn = el.querySelector('.swiper-button-next');
    const pagination = el.querySelector('.swiper-pagination');
    const allSlides = el.querySelector('.swiper-pagination-all');
    const currentSlide = el.querySelector('.swiper-pagination-current');
    const slides = el.querySelectorAll('.swiper-slide');

    const swiper = new Swiper(swiperContianer, {
      modules: [Navigation, Pagination],
      speed: 700,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      },
      pagination: {
        type: 'progressbar',
        el: pagination
      },
      on: {
        init: (swiper) => {
          if (currentSlide) {
            currentSlide.innerText = '01';
            allSlides.innerText = `0${slides.length}`
          }
        },
        slideChange: swiper => {
          if (currentSlide) {
            currentSlide.innerText = `0${swiper.realIndex + 1}`
          }
        }
      }
    })
  })

  document.querySelectorAll('.sales-detail__slider').forEach(el => {
    const swiperContainer = el.querySelector('.swiper');
    const prevBtn = el.querySelector('.swiper-button-prev');
    const nextBtn = el.querySelector('.swiper-button-next');

    const swiper = new Swiper(swiperContainer, {
      modules: [Navigation],
      slidesPerView: 'auto',
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      }
    })
  })
}
