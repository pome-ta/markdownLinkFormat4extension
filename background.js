'use strict';

const copyToClipboard = (tab, text) => {
  function injecteFunction(text) {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injecteFunction,
    args: [text],
  });
};

const updateContexMenu = async () => {
  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: 'main',
    title: 'getMDlink',
  });
};

chrome.runtime.onInstalled.addListener(updateContexMenu); // todo: インストール時
chrome.runtime.onStartup.addListener(updateContexMenu); // todo: 立ち上がり時
chrome.contextMenus.onClicked.addListener((_, tab) => {
  // xxx: 引数の呼び出しとか
  copyToClipboard(tab, `[${tab.title}](${tab.url})`);
});
