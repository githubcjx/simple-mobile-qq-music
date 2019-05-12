// 获取当前播放音乐索引模块
(function (root) {
    // 控制类
    function Control(len) {
        this.index = 0;
        this.len = len;
    }

    Control.prototype = {
        // 索引向前
        prev: function () {
            return this.getIndex(-1);
        },
        // 索引向后
        next: function () {
            return this.getIndex(1);
        },
        // 获取当前播放音乐索引
        getIndex: function (val) {
            var index = this.index,
                len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    // 暴露调用接口
    root.controlIndex = Control;

})(window.player || (window.player = {}))