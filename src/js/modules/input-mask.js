import IMask from 'imask';

export const inputMask = () => {
  const inputTel = document.querySelectorAll('input[type="tel"]');

  inputTel.forEach(el => {
    const maskOptions = {
      mask: '+{7} (000) 000-00-00'
    }

    const mask = IMask(el, maskOptions)

  })
}