import $ from 'jquery';
import {lockScroll, unlockScroll} from "./scroll-lock";
import {$header} from "../constants";
import Scrollbar from "smooth-scrollbar";

class Modal {
    constructor() {
        this.modalSelector = '[data-modal]';
        this.body = $('body');
        this.doc = $(document);
        this.closeTimeout = 300;
        this.activeClass = 'is-active';
        this.loadingClass = 'modal-loading';
    }

    isOtherOpen() {
        return $(this.modalSelector).filter(`.${this.activeClass}`).length;
    }

    open (id, lock = true) {
        const $modal = $(`[data-modal=${id}]`);
        const modal = document.querySelector(`[data-modal=${id}]`)
        const eventModalOpen = new Event('modal-open');

        Scrollbar.init(modal.querySelector('.js-section__content'))

        if(lock){
            lockScroll();
        }
        $modal.addClass(this.activeClass).focus();
        this.body.addClass('modal-open');
        this.doc.trigger('modal-open', [id]);
        document.dispatchEvent(eventModalOpen)
    }

    openWithAjax (id, params) {
        const isModalExist = $(`[data-modal=${id}]`).length;

        if (isModalExist) {
            this.open(id);
            return;
        }

        let ajaxUrl = (location.hostname === 'localhost' || location.hostname === '192.168.1.33' || location.hostname === 'cadesign.ru') ? `/ajax/${id}.html` : `./ajax/${id}.html`;
        let ajaxDataType = (location.hostname === 'localhost' || location.hostname === '192.168.1.33' || location.hostname === 'cadesign.ru') ? `html` : `json`;
        let ajaxType = (location.hostname === 'localhost' || location.hostname === '192.168.1.33' || location.hostname === 'cadesign.ru') ? `GET` : `POST`;

        $.ajax({
            type: ajaxType,
            url: ajaxUrl,
            data: {
                action: 'LoadBlocks/getModal',
                modalID: id,
                params
            },
            dataType: ajaxDataType,
            beforeSend: () => {
                this.showLoader();
            },
            success: (data) => {
                const dataHtml = data.MODAL_HTML ? data.MODAL_HTML : data;
                document.body.insertAdjacentHTML('beforeend', dataHtml);
                modal.open(id);
                // $('[name=phone]').mask("+7 (999) 999-99-99");
                // if(myLazyLoad) {
                //     myLazyLoad.update();
                // }
            },
            error: () => {
                this.showError();
            },
            complete: () => {
                this.hideLoader();
            }
        });

    }

    close(id, look = true) {
        const $modal = $(`[data-modal=${id}]`),
            dataOnClose = $modal.data('modal-onclose');
        const eventCloseModal = new Event('modal-close');
        const modal = document.querySelector(`[data-modal=${id}]`)

        if (id) {
            if(id == 'fast-order') {
                $modal.remove();
            } else {
                $modal.removeClass(this.activeClass);
            }

        } else {
            $('[data-modal]').removeClass(this.activeClass);
        }

        if (!this.isOtherOpen()) {
            setTimeout(() => {
                if(look) {
                    unlockScroll();
                    // simplebar.recalculate()
                }

                this.body.removeClass('modal-open');

                if (dataOnClose === 'remove') {
                    $modal.remove();
                }
            }, this.closeTimeout);
        }

        Scrollbar.destroy(modal.querySelector('.js-section__content'))

        this.doc.trigger('modal-close', [id]);
        document.dispatchEvent(eventCloseModal)
    }

    toggle(id) {
        const $modal = $(`[data-modal=${id}]`);
        const isActive = $modal.hasClass(this.activeClass);
        if (isActive) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    showLoader() {
        let $loader = $(`.modal-loader`);

        if (!$loader.length) {
            $loader = $(`<div class="modal-loader" />`);
            this.body.append($loader);
        }

        this.body.addClass(this.loadingClass);
    }

    hideLoader() {
        this.body.removeClass(this.loadingClass);
    }

    showError() {
        let $errorModal = $(`[data-modal="modal-error"]`);

        if (!$errorModal.length) {
            $errorModal = $(`<div class="modal" data-modal="modal-error"><div class="modal__error">Произошла ошибка</div></div>`);
            this.body.append($errorModal);
        }

        this.open('modal-error');
    }

    onModalLoaded(dataHtml) {}
}

const modal = new Modal();

window.modal = modal;

export const modalsInit = () => {
    const $document = $(document);

    $document.on('click', '[data-modal-open]', function (e) {
        const $this = $(this),
            modalId = $this.data('modal-open');

        if(modalId !== 'catalog') {
            e.preventDefault();
        }

        modal.open(modalId);
    });

    $document.on('click', '[data-modal-ajax-open]', function (e) {
        e.preventDefault();
        const $this = $(this),
            modalId = $this.data('modal-ajax-open'),
            params = $this.data();
        modal.openWithAjax(modalId, params);
    });

    $document.on('click', '[data-modal-close]', function (e) {
        e.preventDefault();
        const $this = $(this),
            modalId = $this.data('modal-close');
        modal.close(modalId);
    });

    $document.on('click', '[data-modal]', function (e) {
        if ($(e.target).closest('[data-modal-inner]').length) return;
        e.preventDefault();
        const modalId = $(e.currentTarget).data('modal');
        modal.close(modalId);
    });

    $document.on('click', '[data-modal-toggle]', function (e) {
        e.preventDefault();
        const $this = $(this),
            modalId = $this.data('modal-toggle');

        $(`[data-modal-toggle='${modalId}'`).toggleClass('is-active');

        if($this.hasClass('is-active')){
            modal.open(modalId);
        }else {
            modal.close(modalId);
        }
    });

    function closeMenu() {
        $('.detail-menu').each(function (i, el){
            const $this = $(el),
              modalId = $this.data('modal');

            modal.close(modalId, false);
        })
    }

    $document.on('mouseenter', '[data-modal-menu-open]', function (e) {
        e.preventDefault();
        const $this = $(this),
          modalId = $this.data('modal-menu-open');

        closeMenu();
        if(modalId){
            modal.open(modalId, false);
        }
    });

    $header.on('mouseleave', () => {
        closeMenu();
    })
}

modalsInit();

export {
    modal
};
