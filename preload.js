// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { clipboard } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const copyAllBtn = document.getElementById('copy-all-btn');
  copyAllBtn.addEventListener('click', function () {
    const cmd = document.getElementById("ffmpeg-command").innerText;
    clipboard.writeText(cmd);
  });

  const copyPartbtn = document.getElementById('copy-part-btn');
  copyPartbtn.addEventListener('click', function () {
    String.prototype.indexOfNth = function (searchElement, n) {
      let x = this.indexOf(searchElement);
      for (let i = 0; i < n; i++) {
        x = this.indexOf(searchElement, x + 1);
      }
      return x;
    };

    const cmd = document.getElementById("ffmpeg-command").innerText;
    if (!!cmd) {
      console.log(cmd.substring(cmd.indexOfNth(' ', 2), cmd.lastIndexOf(' ')));
      clipboard.writeText(cmd.substring(cmd.indexOfNth(' ', 2), cmd.lastIndexOf(' ')));
    }
  });
});
