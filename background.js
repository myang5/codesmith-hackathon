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


chrome.runtime.onMessage.addListener(
  function (message, sender) {
    if (message.hasOwnProperty('isBlur')) {
      chrome.browserAction.setIcon({
        path: {
          '16': 'images/snooze-news16.png',
          '32': 'images/snooze-news32.png'
        }
      });
      chrome.tabs.query({ url: "*://*.nytimes.com/*" }, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { isBlur: true });
        })
      });

      setTimeout(() => {
        chrome.browserAction.setIcon({
          path: {
            '16': 'images/live-news16.png',
            '32': 'images/live-news32.png'
          }
        });
        chrome.tabs.query({ url: "*://*.nytimes.com/*" }, function (tabs) {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { isBlur: false });
          })
        });
      }, message.time);
    }
  });
