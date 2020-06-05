alert('inserted blur.js');

chrome.runtime.onMessage.addListener(function (message) {
  console.log('received message', message.isBlur);
  if (message.isBlur === true) {
    document.querySelectorAll('img').forEach(img => {
      img.style.filter = 'blur(6px)';
      img.style['-webkit-filter'] = 'blur(6px)';
    })
  }
  if (message.isBlur === false) {
    document.querySelectorAll('img').forEach(img => {
      img.style.filter = 'unset';
      img.style['-webkit-filter'] = 'unset';
    })
  }
})