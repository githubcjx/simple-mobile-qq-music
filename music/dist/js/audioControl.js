// 音频控制模块
(function ($, root) {
    // 音频管理类
    function AudioManager() {
        this.audio = new Audio();
        this.status = 'pause';
    }

    AudioManager.prototype = {
        // 音乐播放
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        // 音乐暂停
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        // 获取音乐源
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        // 音乐时间跳转至其他时段
        playTo: function (time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    // 暴露调用接口
    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))


