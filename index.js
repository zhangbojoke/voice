$(function() {
  function initCommenEvent() {
    $('.btn-prev').click(function() {
      if (app.audios && app.audios.aCrow) {
        // app.audios.aCrow.play();
      }
      if (app.pages[app.currentPage - 1]) {
        app.showPage(app.currentPage - 1);
        // return false;
      }
    });
    $('.btn-next').click(function() {
      if (app.audios && app.audios.aWow) {
        // app.audios.aWow.play();
      }
      if (app.pages[app.currentPage + 1]) {
        app.showPage(app.currentPage + 1);
      }
    });

    /*******添加按钮点击动效*******/
    $('.btn-touchable').on('touchstart', function() {
      $(this).addClass('touched');
      if (app.audios && app.audios.aClick) {
        // app.audios.aClick.play();
      }
    });
    $('.btn-touchable').on('touchend', function() {
      $(this).removeClass('touched');
    });

    // $("body").swipe({
    //   swipeUp: function(event, direction, distance, duration, fingerCount) {
    //     if (app.pages[app.currentPage + 1]) {
    //       app.showPage(app.currentPage + 1);
    //     }
    //   },
    //   swipeDown: function(event, direction, distance, duration, fingerCount) {
    //     if (app.pages[app.currentPage - 1]) {
    //       app.showPage(app.currentPage - 1);
    //       // return false;
    //     }
    //   }
    // });

  }

  /***********************************/
  function loading(showPageId, branch) {
    var timeout;
    var interval = 0;
    var flagFakeOver = 0;
    var processNum = 0;
    var randomStep = function() {
      var time = 50.0 + 0 | Math.random() * 500;
      timeout = setTimeout(function() {
        processNum += 1.0 + 0 | Math.random() * 5;
        if (processNum >= 79) {
          processNum = 79;
          flagFakeOver = 1;
        }
        setProcess(processNum);
        if (!flagFakeOver) {
          randomStep();
        } else {
          clearTimeout(timeout);
        }
      }, time);
    };
    var setProcess = function(n) {
      $('.p0-process').text(n + '%');
    };
    var fakePreload = function() {
      randomStep();
    };

    fakePreload();

    $('.cssloader').hide();
    $('.p0').show();

    app.loader.init({

      // 在manifest中定义加载序列
      manifest: [{
        id: 'p1',
        selector: '.p1 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/bg.jpg', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/tape02.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/result.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/beijing.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p1_btn_wrap.png']
      }, {
        id: 'p2',
        selector: '.p2 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/wrong.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/right.png']
      }, {
        id: 'p3',
        selector: '.p3 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/beijing_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shanghai_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/guangzhou_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xian_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenyang_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/chengdu_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xiamen_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenzhen_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/huhehaote_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shaoxing_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/zc1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/zc2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/zc3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/zc4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/wpc1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/wpc2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/wpc3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/wpc4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/gs1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/gs2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/gs3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/gs4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/ml1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/ml2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/ml3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/ml4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/erz1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/erz2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/erz3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/erz4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/erz5.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/qq1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/qq2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/qq3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/qq4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mj1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mj2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mj3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mj4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mny1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mny2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mny3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mny4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mny5.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hm1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hm2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hm3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hm4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hm5.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hysx1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hysx2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hysx3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/hysx4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/score.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/beijing-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shanghai-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/guangzhou-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/chengdu-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenyang-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xiamen-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xian-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shaoxing-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/huhehaote-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenzhen-btn.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/baoji_03.png']
      }, {
        id: 'p4',
        selector: '.p4 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/0.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/5.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/6.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/7.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/8.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/9.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4-word1.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4-word2.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4-word3.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4-word4.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4-letter1.png']
      }],


      onAllFrontImgLoaded: function(e) {
        // console.log('onAllFrontImgLoaded');
        clearInterval(interval);
        processNum = 80;
        flagFakeOver = 1;
        clearTimeout(timeout);

        interval = setInterval(function() {
          processNum += 3;
          if (processNum >= 100) {
            processNum = 100;
            clearInterval(interval);
            app.showPage(showPageId, branch);
          }
          setProcess(processNum);
        }, 20);
      },
    });
    app.loader.showPageNo = showPageId;
    app.loader.start('p' + showPageId);

  }

  function loadGif() {
    app.loader.init({
      manifest: [{
        id: 'p1',
        selector: '.p1 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/guangzhou.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/huhehaote.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenyang.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xian.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/chengdu.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shanghai.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shaoxing.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenzhen.gif', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xiamen.gif', ]
      }, {
        id: 'p4',
        selector: '.p4 img',
        imgs: ['http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn_03.png', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn.png']
      }]
    });
  }

  /************************************/

  function initApp() {
    app.initPages();
    loading(1);
    app.common.initContentBox($('.content'), 5, 3);
    initCommenEvent();
    loadGif();
    // app.bgm && app.bgm.init();
  }

  initApp();
});
