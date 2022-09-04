import checkIsTouch from "./libs/detectTouch";

export const $document = $(document);
export const $body = $('body');
export const $header = $('.header');
export const isTouch = checkIsTouch();
export const getDevicePixelRatio = window.devicePixelRatio;

export const Breakpoints = {
    XL: 1640,
    LG: 1279,
    MD: 1023,
    SM: 767,
    XS: 575,
    XXS: 449
};

export const mediaBreakpoints = {
    XL: window.matchMedia(`(max-width: ${Breakpoints.XL}px)`),
    LG: window.matchMedia(`(max-width: ${Breakpoints.LG}px)`),
    MD: window.matchMedia(`(max-width: ${Breakpoints.MD}px)`),
    SM: window.matchMedia(`(max-width: ${Breakpoints.SM}px)`),
    XS: window.matchMedia(`(max-width: ${Breakpoints.XS}px)`),
    XXS: window.matchMedia(`(max-width: ${Breakpoints.XXS}px)`),
};

export const withBreakpoint = function(fn, bp) {
    const mq = window.matchMedia('(max-width: '+ bp +'px)');
    fn(mq);
    mq.addListener(fn);
};

export const isLocalhost = window.location.hostname === 'localhost';

export const isMobile  = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
};
