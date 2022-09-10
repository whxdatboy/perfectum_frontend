export const priceSelectOpen = (e) => {
    if (e.target.closest('.select__head')) {
        e.target.closest('.price-select').classList.toggle('is-active')
    }
}

export const priceSelectClose = (e) => {
    if (!e.target.closest('.price-select') && document.querySelector('.price-select').classList.contains('is-active')) {
        document.querySelector('.price-select').classList.remove('is-active')
    }
}

export const chooseSelect = (e) => {
    if (e.target.closest('.select__item')) {
        document.querySelector('.select__head-text').innerText = e.target.closest('.select__item').innerText;
        document.querySelector('.price-select').classList.remove('is-active');
        document.querySelector('.select__head').setAttribute('data-active-price', e.target.closest('.select__item').dataset.price);
        document.querySelector('.select-price__value').innerText = e.target.closest('.select__item').dataset.price;
    }
}