/**
 * 当前页面获取上一个页面的实例
 */
function getPrevPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 2];
}

/**
 * 当前页面获取上一个页面的实例，获取 exposed 对象
 */
function getPrevPageExposed() {
  const prevPage = getPrevPage();
  return prevPage.$vm.$.exposed;
}

export { getPrevPage, getPrevPageExposed };
