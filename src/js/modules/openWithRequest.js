import {lockScroll, unlockScroll} from "./scroll-lock";
import LazyLoad from "vanilla-lazyload";
import {Breakpoints} from "../constants";

class openWithRequest {
    constructor(options) {
        let defaultOptions = {
            openContent: () => {
            },
            closeContent: () => {
            },
        }
        this.options = Object.assign(defaultOptions, options)
        this.content = document.querySelector('.ajax-content');
        this.links = document.querySelectorAll('[data-content]');
        this.backLink = document.querySelector('.customers-mobile');
        this.container = document.querySelector('.customers-content');
        this.menuLink = document.querySelectorAll('.customers-link');
        this.eventContentChanged = new Event('content-changed');
        this.open();
        this.close();
    }

    open() {
        if (this.links.length > 0) {
            this.links.forEach(link => {
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const link = e.target.closest('.customers-link');
                    const url = link.dataset.content;
                    document.querySelector('.ajax-content').style.opacity = 0;

                    let response = await fetch(url)

                    if (response.ok) {
                        let json = await response.text();
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(json, "text/html");

                        let html = doc.querySelector('.ajax-content').innerHTML;
                        this.content.innerHTML = html
                        document.querySelector('.ajax-content').style.opacity = 1;
                        document.title = doc.title;
                        if (window.innerWidth > Breakpoints.SM) {
                            const state = {'page_url': url, 'html': html, 'title': doc.title};
                            const title = document.title;
                            history.pushState(state, title, url)
                        }

                        this.handlerEvents();

                        this.menuLink.forEach(el => el.closest('.customers-item').classList.remove('customers-item-active'))

                        link.closest('.customers-item').classList.add('customers-item-active')

                        if (window.innerWidth <= Breakpoints.SM) {
                            lockScroll()
                            this.container.classList.add('active');
                        }

                        window.myLazyLoad = new LazyLoad({
                            elements_selector: '.lazy',
                        });


                    } else {
                        console.log(response.status)
                    }
                })
            })
        }
    }

    close() {
        this.backLink.addEventListener('click', (e) => {
            e.preventDefault();

            if (this.container.classList.contains('active')) {
                this.container.classList.remove('active')
                unlockScroll()
            }
        })
    }

    handlerEvents() {
        document.dispatchEvent(this.eventContentChanged);
    }

}

if (document.querySelectorAll('.customers-link').length > 0) {
    const req = new openWithRequest({})
    if (window.innerWidth > Breakpoints.SM) {
        let url = document.location.protocol + '//' + document.location.host + document.location.pathname;
        let state = {
            'page_url': url,
            'html': document.querySelector('.ajax-content').innerHTML,
            'title': document.title
        };
        history.replaceState(state, document.title, url);
        window.addEventListener('popstate', (e) => {
            if (e.hasOwnProperty('state')) {
                if (e.state.hasOwnProperty('page_url')) {
                    let parser = new DOMParser();
                    document.querySelector('.ajax-content').innerHTML = e.state.html;
                    document.title = e.state.title;
                    let menuLink = document.querySelectorAll('.customers-link');
                    menuLink.forEach(el => el.closest('.customers-item').classList.remove('customers-item-active'))
                    document.querySelector('[data-content="' + e.state.page_url + '"]').closest('.customers-item').classList.add('customers-item-active');
                    req.handlerEvents();
                }
            }
        });
    }
}
