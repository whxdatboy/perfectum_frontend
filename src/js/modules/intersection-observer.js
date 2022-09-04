import Swiper, { Pagination, Navigation} from "swiper";
import {Breakpoints, withBreakpoint} from "../constants";

export const initIntersectionObserver = () => {
  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    $('body').addClass('is-intersection');
    const options = {
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    //
    const observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if(item.isIntersecting) { // && item.intersectionRatio>0.25
          // console.log('Нашел карточку')
          if(!$(item.target).hasClass('init')) {
            // console.log('Инициализировал слайдр')
            item.target.classList.add('init');
            $(this).addClass('init');
            const container = item.target.querySelector('.swiper');
            const pagination = item.target.querySelector('.swiper-pagination');
            const arrowNext = item.target.querySelector('.swiper-button-next');
            const arrowPrev = item.target.querySelector('.swiper-button-prev');

            new Swiper(container, {
              modules: [Pagination, Navigation],
              slidesPerView: 'auto',
              loop: false,
              speed: 400,
              pagination: {
                el: pagination,
              },
              navigation: {
                nextEl: arrowNext,
                prevEl: arrowPrev,
              },
            });
          }
          observer.unobserve(item.target);
          // console.log('Перестал следить за карточкой')
        }
      });
    }, options);

    document.querySelectorAll('.partner-slider').forEach(el => {
      observer.observe(el);
    })
  }
}



