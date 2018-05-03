app.pages[3] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p3',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {
    $('.p3-btn-t').on('touchstart', function(e) {
      e.preventDefault();
      if (app.nextPage) {
        if (app.index == 10) {
          $('.p3-score').hide();
          $('.p3-score-click').show();
        } else {
          $('.p3-next').hide();
          $('.p3-next-click').show();
        }
      }
      app.nextPage = false;
    })

    $('.p3-btn-t').on('touchend', function(e) {
      e.preventDefault();
      if (app.index == 5) {
        $('.p3-score-click').hide();
        $('.p3-score').show();
        app.showPage(4);
        app.nextPage = true;
      } else {
        $('.p3-next-click').hide();
        $('.p3-next').show();
        app.showPage(2);
        app.nextPage = true;
      }
    })
  }

  function changePath() {
    var index = app.index;
    var gifPath = app.p3Content[index].gif;
    var btnPath = app.p3Content[index].btn;
    var linePath = app.p3Content[index].p3Line;

    $.each(linePath, function(num) {
      var classNum = num + 1;
      var img = $('<img>').attr('src', linePath[num]).addClass('p3-pic p3-line' + classNum + '');
      $('.p3-info').append(img);
    })
    $('.p3-gif').attr('src', gifPath);
  }

  function lineShow() {
    // $('.p3-tape02').addClass('flip');
    // setTimeout(function() {
    //   $('.p3-tape-gif').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/tape03.png');
    // }, 500);
    answerShow();
  }
  function answerShow() {
    $('.btn1').fadeIn(500);
    $('.p3-line1').fadeIn(500);
    $('.p3-line2').fadeIn(500);
    setTimeout(function(){
      if (app.p3Content[app.index].p3Line.length == 2) {
        // $('.p3-line4').fadeIn(500);
        // $('.p3-line5').fadeIn(500, function() {
        if (app.index == 10) {
          $('.p3-score').fadeIn(500);
        } else {
          $('.p3-next').fadeIn(500);
        }
        // });
      } else {
        $('.p3-line4').fadeIn(500, function() {
          if (app.index == 10) {
            $('.p3-score').fadeIn(500);
          } else {
            $('.p3-next').fadeIn(500);
          }
        });
      }
    },500);
  }

  function onLoad() {
    setTimeout(function() {
      page.isFlipReady = true;
    }, 500);
    changePath();
    lineShow();
  }

  function onLeave() {
    page.isFlipReady = false;
    //声音暂停
    app['audios'][app['index']].pause();
    app.index++;
    setTimeout(function() {
      $('.btn1,.btn2').hide();
      $('.p3-gif').attr('src', '');
      $('.p3-info').find('img').remove();
      // $('.p3-tape-gif').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/15.gif');
    }, 500);
  }

  return page;
})();
