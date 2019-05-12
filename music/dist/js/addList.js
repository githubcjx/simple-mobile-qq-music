
(function ($, root) {

    function addList(dataList, index) {
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
        $('.list-box').css('transform', 'translateY(0px)');
        $('.control ul li').eq(index).addClass('active');
        // 关闭列表
    }

    function closeList() {
        $('.close').on('click', function () {
            $('.list-box').css({
                transform: 'translateY(270px)',
                transition: 'all 0.3s ease-in'
            });
        })
    }

    root.addList = {
        addList,
        closeList
    };

})(window.Zepto, window.player || (window.player = {}))