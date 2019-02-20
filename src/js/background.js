import '../img/icon-128.png'
import '../img/icon-34.png'

/**
 * 监听浏览器事件
 */
chrome.tabs.onCreated.addListener(addStyle);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == 'complete') {
    addStyle(tab);
  }
});

/**
 * 获取所有样式
 */
function getStyles() {
  return {
    douban: `
      #top-nav-doumail-link em {
        display: none;
      }
    `,
    linkedin: `
    .msg-conversation-card__unread-count,
    .nav-item__badge,
    .nav-item__badge-count {
      display: none
    }`
  }
}

/**
 * 获取站点名称
 * @param {*} host
 */
function getSiteName(host) {
  if (host.endsWith('.com')) {
    return host.split('.').reverse()[1];
  } else {
    return host;
  }
}

/**
 * 添加对应样式
 * @param {*} tab
 */
function addStyle(tab) {
  var tabUrl = tab.url;
  var host = new URL(tabUrl).host;
  var site = getSiteName(host);
  console.log(site, 'site');
  if (['douban', 'linkedin'].includes(site)) {
    const styles = getStyles();
    chrome.tabs.insertCSS(tab.id, {
      code: styles[site],
      runAt: "document_start"
    });
  }
}