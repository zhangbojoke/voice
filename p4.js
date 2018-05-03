app.pages[4] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p4',
    isFlipReady: false,
    hasBranch: true,
    initVoiceApi: initVoiceApi
  };

  //var isMockVoiceApi = true;
  var isMockVoiceApi = false;

  var otherAudio = null;

  function init() {
    initEvents();
  }

  function initEvents() {
    console.log(3);
    $('.p4-reset-t').on('touchstart', function(e) {
      e.preventDefault();
      $('.p4-btn-reset').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/reset_03.png');
    });

    $('.p4-reset-t').on('touchend', function(e) {
      e.preventDefault();
      $('.p4-btn-reset').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/reset.png');
      resetApp();
      app.showPage(2);
      return false;
    });

    $('.p4-share-t').on('touchstart', function(e) {
      e.preventDefault();
      $('.p4-btn-share').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn_03.png');
      app.showDialog('share');
    });

    $('.p4-share-t').on('touchend', function(e) {
      e.preventDefault();
      $('.p4-btn-share').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn.png');
      return false;
    });

    $('.p4-mac-t').on('touchstart', function(e) {
      e.preventDefault();
      $('.p4-mac').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mac_03.png');
      $('.p4-black').addClass('p4-black-rotate');
      voiceApi.startRecord();
    });

    $('.p4-mac-t').on('touchend', function(e) {
      e.preventDefault();
      $('.p4-mac').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mac.png');
      $('.p4-black').css({ 'animation-play-state': 'paused', '-webkit-animation-play-state': 'paused' });
      voiceApi.stopRecord();
      return false;
    });
    var index = 1;
    $('.p4-letter').on('click', function() {
      if (otherAudio.paused) {
        $('.p4-status').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/stop.png');
        otherAudio.play();
      } else {
        otherAudio.pause();
        $('.p4-status').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/play.png');
      }
    });

    if (isMockVoiceApi) {
      initVoiceApi();
    }


  }

  var index = 1;

  function changeBtn() {
    setInterval(function() {
      if (index == 1) {
        $('.p4-btn-share').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn_03.png');
        index = 0;
      } else {
        $('.p4-btn-share').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/fri-btn.png');
        index = 1;
      }
    }, 600)
  }

  function initVoiceApi() {
    console.log('[initVoiceApi]');
    voiceApi.init({
      isMock: isMockVoiceApi,
      onUploadStart: function() {
        console.log('[onUploadStart]');
        $('.p4-mac').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/mac.png');
        app.showDialog('upload');
      },
      onUploadSuccess: onUploadSuccess,
      onUploadError: function(rsp) {
        console.log('[onUploadError]');
        app.closeDialog('upload');
      }
    });
  }

  function onUploadSuccess(rsp) {
    console.log('[onUploadSuccess] rsp:', rsp);
    app.closeDialog('upload');

    $('.p4-word').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4_bottom_word2.png');
    $('.p4-mac,.circle-box,.p4-mac-t').hide();
    $('.p4-letter').show();

    if (otherAudio) {
      otherAudio.pause();
    }
    otherAudio = new Audio();
    otherAudio.src = rsp.path;
    otherAudio.autoplay = true;
    otherAudio.loop = true;
    otherAudio.pause();
  }

  function resetApp() {
    app.index = 1;
    app.score = 0;
    app.nextPage = true;
    // $('.btn2').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/next.png');
    setTimeout(function() {
      $('.p4-word').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/p4_bottom_word.png');
      $('.p4-mac,.circle-box,.p4-mac-t').show();
      $('.p4-letter').hide();
      $('.p4-black').removeClass('p4-black-rotate');
      $('.p4-black').css({ 'animation-play-state': 'running', '-webkit-animation-play-state': 'running' });
    }, 500);
  }

  function onLoad() {
    changeBtn();

    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);

    var trueNum = app.score;
    if (trueNum == 10) {
      $('.first-img').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/1.png');
      $('.hun-img').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/0.png');
      $('.first-img').show();
    } else if (trueNum == 0) {
      $('.first-img').hide();
      $('.hun-img').hide();
    } else {
      $('.hun-img').attr('src', 'http://p3.ifengimg.com/29b92e35b2b20708/2016/52/' + trueNum + '.png');
      $('.first-img').hide();
    }

    var num = parseInt(Math.random() * 10);
    var probability;
    var shareProbability;
    if (num >= 0 && num <= 3) {
      probability = 1;
    } else if (num > 3 && num <= 6) {
      probability = 2;
    } else if (num > 6 && num <= 9) {
      probability = 3;
    }

    $('.p4-top-word').attr('src', app.p4Content[trueNum].topWord);
    if (trueNum == 0) {
      $('.p4-top-num').text(app.p4Content[trueNum].probabilityContent);
      shareProbability = app.p4Content[trueNum].probabilityContent;
    } else {
      $('.p4-top-num').text(app.p4Content[trueNum].probabilityContent[probability]);
      shareProbability = app.p4Content[trueNum].probabilityContent[probability];
    }

  }

  function onLeave() {
    page.isFlipReady = false;
    if (otherAudio) {
      otherAudio.pause();
    }
  }

  return page;
})();
