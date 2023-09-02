chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status === 'complete') {
    if (
      !tab.url ||
      (!tab.url.startsWith('https://beta.character.ai') &&
        !tab.url.startsWith('https://plus.character.ai'))
    ) {
      return;
    }

    chrome.tabs.sendMessage(tabId, { data: tab });
  }
});
