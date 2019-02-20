import '../img/icon-128.png'
import '../img/icon-34.png'
import { SITES } from './sites';
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
 * 获取支持的站点列表
 * @param {*} callback
 */
function getEnableSites(callback) {
  chrome.storage.local.get('notify_setting', (storage) => {
    let sites = [];
    if (Array.isArray(storage['notify_setting'])) {
      sites = storage['notify_setting']
      .filter((site) => {return site.selected})
      .map((site) => {
        return site.value;
      });
    } else {
      sites = SITES.map((site) => {
        return site.value;
      });
    }
    callback && callback(sites);
  });
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
  getEnableSites((sites) => {
    if (sites.includes(site)) {
      const styles = getStyles();
      chrome.tabs.insertCSS(tab.id, {
        code: styles[site],
        runAt: "document_start"
      });
    }
  })
}