// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const slider = {
    use: function (id) {
        const self = this;
        self.slider = document.getElementById(id);
        self.bar = self.slider.querySelector('.progress-bar');
        self.thumb = self.slider.querySelector('.progress-thumb');
        self.slider.addEventListener('mousedown', function (e) {
            if (e.button === 0) { // 判断点击左键
                self.mDown = true;
                self.beginX = e.offsetX;
                self.positionX = e.offsetX;
                self.beginClientX = e.clientX;
                self.sliderLong = parseInt(self.getStyle(self.slider, 'width'));
                const per = self.positionX / self.sliderLong * 100;
                self.bar.style.width = per + '%';
            }
        });

        document.addEventListener('mousemove', function (e) {
            if (self.mDown) {
                const moveX = e.clientX - self.beginClientX;
                self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX;
                const per = self.positionX / self.sliderLong * 100;
                self.bar.style.width = per + '%';

                console.log('PER: ', per);
                document.getElementById('video-crf-options-value').innerText = Math.floor(per * 51 / 100) + '';
            }
        });

        document.addEventListener('mouseup', function (e) {
            if (e.button === 0) {
                self.mDown = false;
            }
        });
    },
    getStyle: function (obj, styleName) {
        return getComputedStyle(obj, null)[styleName];
    }
};

slider.use('progressbar');
