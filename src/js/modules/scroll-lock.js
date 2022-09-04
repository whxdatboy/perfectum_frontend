import {scrollbar} from "./scrollbar";

const div = document.createElement('div');
div.classList.add('js-scroll')
div.style.overflowY = 'auto';
div.style.width = '50px';
div.style.height = '50px';
div.style.visibility = 'hidden';
document.body.appendChild(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
document.body.removeChild(div);

const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];

let bodyScrollTop = null;
let locked = false;

export const lockScroll = () => {
    if (!locked) {
        if (window.document.documentElement.clientHeight < body.scrollHeight) {
            body.style.paddingRight = scrollWidth + 'px';
            // header.style.paddingRight = scrollWidth + 'px';
        }
        bodyScrollTop =
            typeof window.pageYOffset !== "undefined"
                ? window.pageYOffset
                : (document.documentElement ||
                document.body.parentNode ||
                document.body).scrollTop;

        body.classList.add("scroll-locked");
        scrollbar.updatePluginOptions("stopScroll", { scroll: false })
        locked = true;
    }
};

export const unlockScroll = () => {
    if (locked) {
        body.classList.remove("scroll-locked");

        body.style.top = null;
        window.scrollTo(0, bodyScrollTop);
        body.style.paddingRight = '';
        header.style.paddingRight = '';
        locked = false;
        scrollbar.updatePluginOptions("stopScroll", { scroll: true })
    }
};
