import '../img/icon-128.png'
import '../img/icon-34.png'

chrome.tabs.onCreated.addListener(addStyle);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == 'complete') {
    addStyle(tab);
  }
});

function addStyle(tab) {
  var tabUrl = tab.url;
  if (tabUrl && tabUrl.indexOf("douban.com") != -1) {
    chrome.tabs.insertCSS(tab.id, {
      code: `
        #top-nav-doumail-link em {
          display: none;
        }
      `
    });
  }
}