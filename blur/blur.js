chrome.tabs.onMessage.addListener(function(message) {
  console.log(message);
})


setTimeBtn.onclick = function (e) {
  let input = document.getElementById('time').value;
  if (isNaN(input)) document.getElementById('time').value = '';
  else { time = input * 60000; isBlur = true }
  injectCSS('blur/blur.css');
  chrome.browserAction.setIcon({
    path: {
      '16': 'images/snooze-news16.png',
      '32': 'images/snooze-news32.png'
    }
  });
  setTimeout(() => {
    isBlur = false;
    injectCSS('blur/noblur.css')
    chrome.browserAction.setIcon({
      path: {
        '16': 'images/live-news16.png',
        '32': 'images/live-news32.png'
      }
    });
  }, time)
};

function injectCSS(file) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabs.forEach(currTab => {
      chrome.tabs.insertCSS(
        currTab.id,
        { file: file });
    });
  })
}