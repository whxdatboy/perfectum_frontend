const mobMenu = () => {
    document.querySelector('.header__hamb').classList.toggle('is-active');
    document.querySelector('.header__wrap').classList.toggle('is-active');
}

export const hambInit = () => {
    let init = false;

    if (window.innerWidth <= 1024) {
        init = true;
        document.querySelector('.header__hamb').addEventListener('click', mobMenu)
    } else if (window.innerWidth > 1024 && init) {
        let init = false;
        document.querySelector('.header__hamb').removeEventListener('click', mobMenu)
    }
}

const selectOpen = (e) => {
    const sel = e.target.closest('.select');

    sel.querySelector('.select-choose').classList.toggle('is-active')
    sel.querySelector('.select-list').classList.toggle('is-active')
}

export const tabsSelectInit = () => {
    let init = false;
    const selects = document.querySelectorAll('.select')

    if (window.innerWidth <= 768) {
        init = true;
        selects.forEach(el => {
            el.addEventListener('click', selectOpen)

            el.querySelectorAll('.tabs-item').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const link = e.target.closest('.tabs-item').querySelector('a');
                    const choose = e.target.closest('.select').querySelector('.text');

                    choose.innerText = link.innerText;
                })
            })
        })
    } else if (window.innerWidth > 768 && init) {
        selects.forEach(el => {
            el.removeEventListener('click', selectOpen)

            el.querySelectorAll('.tabs-item').forEach(tab => {
                tab.removeEventListener('click', (e) => {
                    const link = e.target.closest('.tabs-item').querySelector('a');
                    const choose = e.target.closest('.select').querySelector('.text');

                    choose.innerText = link.innerText;
                })
            })
        })
    }
}