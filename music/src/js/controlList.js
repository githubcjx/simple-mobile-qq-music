// 控制音乐列表模块
(function ($, root) {
    // 添加音乐列表
    function addList(dataList) {
        var str = '';
        for (var i = 0; i < dataList.length; i++) {
            str += `<li>${dataList[i].singer} - ${dataList[i].song}</li>`;
        }
        var htmlStr = `<div class="list-box">
                            <div class="notice">播放列表</div>
                            <ul>${str}</ul>
                            <div class="close">关闭</div>
                        </div>`;
        $('.list').html(htmlStr);
        $('.list-box').css({
            transform: `translateY(${dataList.length * 42 + 102}px)`
        });
    }
    // 点击音乐列表
    function clickList(index) {
        $('.list-box').css({
            transform: 'translateY(0px)'
        });
        $('.control ul li').removeClass('active').eq(index).addClass('active');
    }
    // 关闭音乐列表
    function closeList() {
        $('.list-box').css({
            transform: `translateY(${dataList.length * 42 + 102}px)`
        });
    }

    root.controlList = {
        addList,
        clickList,
        closeList
    };

})(window.Zepto, window.player || (window.player = {}))