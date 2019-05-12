// 渲染音乐信息模块
(function ($, root) {
    // 渲染音乐图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src);
            player.blurImg(img, $('body'));
        }
    }
    // 渲染音乐信息
    function renderInfo(info) {
        var str = `<div class="song-name">${info.song}</div>
                <div class="singer-name">${info.singer}</div>
                <div class="album-name">${info.album}</div>`;
        $('.song-info').html(str);
    }
    // 是否标记为喜欢
    function renderIsLike(like) {
        if (like) {
            $('.like').addClass('liking');
        } else {
            $('.like').removeClass('liking');
        }
    }
    // 暴露调用接口
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }

})(window.Zepto, window.player || (window.player = {}))