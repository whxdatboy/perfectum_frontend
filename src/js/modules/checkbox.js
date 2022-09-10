export const disableSubmit = () => {

    if (document.querySelector('.form')) {
        const checkbox = document.querySelector('.form').querySelector('input[type="checkbox"]');

        if (checkbox.checked) {
            document.querySelector('.form').querySelector('button').removeAttribute('disabled')
        } else {
            document.querySelector('.form').querySelector('button').setAttribute('disabled', '')
        }
    }


}