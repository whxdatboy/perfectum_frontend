let winsize = {};
function setSize() {
    const documentStyles = document.documentElement.style;
    winsize.width = document.documentElement.clientWidth;
    winsize.height = window.innerHeight;
    documentStyles.setProperty('--vh', `${winsize.height / 100}px`);
    documentStyles.setProperty('--vw', `${winsize.width / 100}px`);
}
setSize();
window.addEventListener('resize', setSize);
