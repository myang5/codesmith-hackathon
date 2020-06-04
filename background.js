chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.nytimes.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

//let blur = true;

//chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//  console.log(tabId, changeInfo, tab);
//  if(changeInfo.status === 'complete') {
//    chrome.tabs.sendMessage( tabId, {
//      isBlur: blur,
//    })
//  }

//})
