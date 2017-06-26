'use strict';

const remote = require('electron').remote;

const win = window;
const doc = document;
const body = doc.body;

const webview = doc.getElementById('webview');
const controlBar = doc.getElementById('control-bar');

const btnBack = doc.getElementById('btn-back');
const btnForward = doc.getElementById('btn-forward');
const btnReload = doc.getElementById('btn-reload');
const btnPin = doc.getElementById('btn-pin');

function addClass(ele, ...cls) {
  return ele.classList.add(...cls);
}

function removeClass(ele, ...cls) {
  return ele.classList.remove(...cls);
}

webview.addEventListener('new-window', e => {
  console.log('webview: new-window');
  webview.loadURL(e.url);
});

webview.addEventListener('dom-ready', e => {
  console.log('webview: dom-ready');

  webview.executeJavaScript(`
    const timer = setInterval(function () {
      const player = document.getElementById('tenvideo_player');

      if (player) {
        document.documentElement.classList.add('txp_html_fullscreen', 'txp_html_barrage_on');
        clearInterval(timer);
      }
    }, 500);
  `);
});

body.addEventListener('mouseenter', e => {
  console.log('mouseenter');
  addClass(controlBar, 'active');
});

body.addEventListener('mouseleave', e => {
  console.log('mouseleave');
  removeClass(controlBar, 'active');
});

btnBack.addEventListener('click', e => {
  console.log('click: btn-back');
  if (webview.canGoBack()) {
    webview.goBack();
  }
}, false);

btnForward.addEventListener('click', e => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
}, false);

btnReload.addEventListener('click', e => {
  webview.reload();
}, false);

btnPin.addEventListener('click', e => {
  const currentWindow = remote.getCurrentWindow();
  console.log(currentWindow.isAlwaysOnTop());
  if (currentWindow.isAlwaysOnTop()) {
    currentWindow.setAlwaysOnTop(false);
    removeClass(btnPin, 'active');
  } else {
    currentWindow.setAlwaysOnTop(true);
    addClass(btnPin, 'active');
  }
});
