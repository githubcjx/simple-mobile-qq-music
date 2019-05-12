// 进度条控制模块
(function ($, root) {
    var duration = 0;
    var frameId = null;
    var startTime = null;
    var lastPer = 0;
    // 渲染音乐总时间
    function renderAllTime(time) {
        lastPer = 0;
        duration = time;
        $('.all-time').html(formatTime(time));
    }
    // 修改时间格式
    function formatTime(time) {
        var m = Math.floor(time / 60);
        var s = Math.floor(time - m * 60);
        return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
    }
    // 进度条开始动
    function start(p) {
        lastPer = p === undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            update(per);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    // 进度条停止
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        var per = (stopTime - startTime) / (duration * 1000);
        lastPer += per;
    }
    // 更新拖拽进度条后的当前播放时间
    function update(p) {
        var time = p * duration;
        $('.cur-time').html(formatTime(time));
        var distance = time / duration * $('.pro-bottom').width();
        $('.pro-top').css('width', distance + 'px');
        $('.pro-top .slider-point').css('margin-left', distance + 'px');
    }
    // 暴露调用接口
    root.progressTime = {
        renderAllTime,
        start,
        stop,
        update
    };

})(window.Zepto, window.player || (window.player = {}))