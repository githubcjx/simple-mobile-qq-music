var dataList,
    len,
    root = window.player,
    audio = root.audioManager,
    control,
    timer = null;
// 获取json数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url,
        success: function (data) {
            console.log(data);
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.progressTime.renderAllTime(dataList[0].duration);
            player.render(data[0]);
            audio.getAudio(dataList[0].audio);
            $('.img-box').attr('data-deg', 0);
            root.controlList.addList(dataList);
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log('error');
        }
    })
}
// 各事件绑定
function bindEvent() {
    // 自定义上一首和下一首事件
    $('body').on('changeSong', function (e, i) {
        player.render(dataList[i]);
        audio.getAudio(dataList[i].audio);
        if (audio.status == 'play') {
            audio.play();
            root.progressTime.stop();
            root.progressTime.start(0);
            rotated(0);
        } else {
            root.progressTime.update(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        });
        root.progressTime.renderAllTime(dataList[i].duration);
    })
    // 上一首
    $('.prev').on('click', function () {
        $('body').trigger('changeSong', control.prev());
    });
    // 下一首
    $('.next').on('click', function () {
        $('body').trigger('changeSong', control.next());
    });
    // 播放或暂停
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.progressTime.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            clearInterval(timer);
            root.progressTime.stop();
        }
        $(this).toggleClass('playing');
    });
    // 标记喜欢
    $('.like').on('click', function () {
        dataList[control.index].isLike = !dataList[control.index].isLike;
        $(this).toggleClass('liking');
    });
    // 打开音乐列表
    $('.list').on('click', function (e) {
        root.controlList.clickList(control.index);
        e.stopPropagation();
    });
    // 关闭音乐列表
    $('.close').on('click', function (e) {
        root.controlList.closeList();
        e.stopPropagation();
    });
    // 列表音乐点击
    $('.list-box ul li').each(function (i) {
        $(this).on('click', function () {
            player.render(dataList[i]);
            audio.getAudio(dataList[i].audio);
            audio.play();
            root.progressTime.stop();
            root.progressTime.start(0);
            rotated(0);
            control.index = i;
            $('.img-box').attr('data-deg', 0);
            $('.img-box').css({
                'transform': 'rotateZ(0deg)',
                'transition': 'none'
            });
            root.progressTime.renderAllTime(dataList[i].duration);
            $(this).addClass('active');
            $('.play').addClass('playing');
        });
    });
}
// 拖拽进度条事件绑定
function bindTouch() {
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.slider-point').on('touchstart', function () {
        root.progressTime.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            root.progressTime.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            var duration = dataList[control.index].duration;
            var curTime = per * duration;
            // 跳转歌曲时间
            audio.playTo(curTime);
            audio.play();
            root.progressTime.start(per);
            $('.play').addClass('playing');
            audio.status = 'play';
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }
    });
}
// 判断音乐是否播放完毕，若完毕，播放下一首
$(audio.audio).on('ended', function () {
    $('.next').trigger('click');
});
// 音乐转盘旋转
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': `rotateZ(${deg}deg)`,
            'transition': 'all .2s ease-in'
        });
        deg += 2;
    }, 200);
}
// 获取json数据
getData('../mock/data.json');
