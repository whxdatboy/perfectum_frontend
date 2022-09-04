class Tabs {
  constructor(selector, options) {
    let defaultOptions = {
      tabActive: () => { },
      tabClose: () => { },
    }

    this.options = Object.assign(defaultOptions, options);
    this.tabs = selector;
    this.tabsList = document.querySelector('.tabs-list');
    this.tabsItems = document.querySelectorAll('.tabs-item');
    this.tabsWrap = document.querySelector(`.tabs-wrap`);
    this.tabsContent = document.querySelectorAll(`.tabs-content`);
    this.event();
  }

  event() {
    if (this.tabs) {
      this.tabsList.addEventListener('click', (e) => {
        if (e.target.closest('.tabs-item-link')) {
          e.preventDefault();
          let tabData = e.target.closest('.tabs-item-link').dataset.tabsOpen

          this.tabsItems.forEach(el => {el.classList.remove('tabs-item-active')})
          e.target.closest('.tabs-item').classList.add('tabs-item-active')
          this.tabsContent.forEach(el => { el.classList.remove('tabs-content-active') })
          this.tabsWrap.querySelector(`[data-tabs=${tabData}]`).classList.add('tabs-content-active')
        }
      })
    }
  }
}
export const initTabs = () =>{
  document.querySelectorAll('.tabs').forEach(tab => {
    const tabs = new Tabs(tab, {})
  })
}
$(document).on('modal-open', initTabs)
$(document).ready(initTabs)