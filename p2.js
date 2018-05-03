app.pages[2] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p2',
    isFlipReady: false,
    hasBranch: true,
  };


  function init() {
    initEvents();
  }

  var touchNum = 0;
  var touchResult = 0;

  function initEvents() {
    $('.p2-citybox').on('touchstart', '.p2-city-true', function() {
      if (touchResult == 0) {
        touchResult++;
        $('.answer-status').attr('src', './right.png').fadeIn('slow');
        app.score++;
      }
    })
    $('.p2-citybox').on('touchstart', '.p2-city-false', function() {
      if (touchResult == 0) {
        touchResult++;
        $('.answer-status').attr('src', './wrong.png').fadeIn('slow');
      }
    })
    changeClickImg();
  }

  function changeClickImg() {
    $('.p2-city-left').on('touchstart', function(e) {
      e.preventDefault();
      var leftSelector = '.p2-city-left';
      if (app.nextPage) {
        $(leftSelector).attr('src', app.p2Content[app.index].clickImg.leftImg);
      }
      app.nextPage = false;
    })

    $('.p2-city-left').on('touchend', function(e) {
      if (touchNum == 0) {
        touchNum++;
        e.preventDefault();
        var leftSelector = '.p2-city-left';
        $(leftSelector).attr('src', app.p2Content[app.index].btn.left.btnImg);
        $('.answer-status').fadeOut(function() {
          app.showPage(3);
          app.nextPage = true;
        });
      }
    });

    $('.p2-city-center').on('touchstart', function(e) {
      console.log(app.p2Content[app.index].clickImg.centerImg);
      e.preventDefault();
      var centerSelector = '.p2-city-center';
      if (app.nextPage) {
        $(centerSelector).attr('src', app.p2Content[app.index].clickImg.centerImg);
      }
      app.nextPage = false;
    });

    $('.p2-city-center').on('touchend', function(e) {
      if (touchNum == 0) {
        touchNum++;
        e.preventDefault();
        var centerSelector = '.p2-city-center';
        $(centerSelector).attr('src', app.p2Content[app.index].btn.center.btnImg);
        $('.answer-status').fadeOut(function() {
          app.showPage(3);
          app.nextPage = true;
        });
      }
    })

    $('.p2-city-right').on('touchstart', function(e) {
      e.preventDefault();
      var rightSelector = '.p2-city-right';
      if (app.nextPage) {
        $(rightSelector).attr('src', app.p2Content[app.index].clickImg.rightImg);
      }
      app.nextPage = false;
    })

    $('.p2-city-right').on('touchend', function(e) {
      if (touchNum == 0) {
        touchNum++;
        e.preventDefault();
        var rightSelector = '.p2-city-right';
        $(rightSelector).attr('src', app.p2Content[app.index].btn.right.btnImg);
        $('.answer-status').fadeOut(function() {
          app.showPage(3);
          app.nextPage = true;
        });
      }
    })
  }


  function changePic() {
    var index = app.index;
    var idName = '#p2btn-' + index;
    $(idName).show().siblings().hide();

    var html = '<img data-src="./choose-'+index+'-a.png" class="answer-img"\
    data-loaded="loaded" src="./choose-'+index+'-a.png">\
        <img data-src="./choose-'+index+'-b.png" class="answer-img"\
    data-loaded="loaded" src="./choose-'+index+'-b.png">\
        <img data-src="./choose-'+index+'-c.png" class="answer-img"\
    data-loaded="loaded" src="./choose-'+index+'-c.png">"';
    $(".answer-list").html(html);
    //这里更换正确答案
    $(".p2-city-left").removeClass('p2-city-true');
    $(".p2-city-left").removeClass('p2-city-false');
    $(".p2-city-left").addClass(app.p2Content[app.index].btn.left.btnClass);
    $(".p2-city-center").removeClass('p2-city-true');
    $(".p2-city-center").removeClass('p2-city-false');
    $(".p2-city-center").addClass(app.p2Content[app.index].btn.center.btnClass);
    $(".p2-city-right").removeClass('p2-city-true');
    $(".p2-city-right").removeClass('p2-city-false');
    $(".p2-city-right").addClass(app.p2Content[app.index].btn.right.btnClass);
  }
  function onLoad() {
    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);
    app['audios'][app['index']].play();
    changePic();
    touchNum = 0;
    touchResult = 0;
  }

  function onLeave() {
    page.isFlipReady = false;
    $('.answer-status').hide();
  }

  return page;
})();
