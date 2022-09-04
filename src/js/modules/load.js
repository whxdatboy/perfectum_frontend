const loadData = () => {
  return new Promise((resolve, reject) => {

  })
}

loadData()
.then(() => {
  let preloaderEl = document.querySelector('.preloader');
  preloaderEl.classList.add('hidden');
  preloaderEl.classList.remove('active');
})