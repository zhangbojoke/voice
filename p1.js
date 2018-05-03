app.pages[1] = (function() {
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p1',
    isFlipReady: false, //标志页面是否可以翻页, 当页面所有动画运行完之后设置为true,离开页面后再重置为false
    hasBranch: false, //标志页面内是否有分支,默认为false,
  };

  function init() {
    initEvents();
  }

  function initEvents() {
    $('.p1-btn').on('touchstart', function(e) {
      e.preventDefault();
      // $('.p1-btn').attr('src', './p1-btn2.png');
      return false;
    });

    $('.p1-btn').on('touchend', function(e) {
      e.preventDefault();
      // $('.p1-btn').attr('src', './p1-btn1.png');
      app.showPage(2);
      return false;
    })
  }

  function onLoad() {
    setTimeout(function() {
      lineShow();
      page.isFlipReady = true;
    }, 500);
  }

  function onLeave() {
    page.isFlipReady = false;
    // app['audios'][0].pause();
  }

  function lineShow() {
    $('.p1-line1').fadeIn(500, function() {
      $('.p1-line2').fadeIn(500, function() {
        $('.p1-line3').fadeIn(500, function() {
          $('.p1-btn-wrap').fadeIn(500);
          $('.p1-btn').fadeIn(500);
        })
      })
    })
  }

  return page;
})();
