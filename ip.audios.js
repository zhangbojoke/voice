app.audios = (function() {
  var ROOT = app.root;

  function myAudio(src, loop) {
    var audio = new Audio();
    audio.src = ROOT + src;
    audio.volume = 1;
    audio.autoplay = false;
    audio.loop = true;
    if (loop != 1) {
      audio.loop = false;
    }
    // audio.addEventListener('ended', continueBgm);
    return audio;
  }

  function continueBgm(event) {
    if (app.bgm && (!$('#icon-bgm').hasClass('tag-music-off'))) {
      // app.bgm.pause();
      app.bgm.play();
    }
  }

  var beijing = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/beijing.mp3', 1);
  var shanghai = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shanghai.mp3', 1);
  var guangzhou = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/guangzhou.mp3', 1);
  var huhehaote = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/huhehaote.mp3', 1);
  var xian = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xian.mp3', 1);
  var chengdu = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/chengdu.mp3', 1);
  var shenzhen = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenzhen.mp3', 1);
  var xiamen = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/xiamen.mp3', 1);
  var shenyang = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shenyang.mp3', 1);
  var shaoxing = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/shaoxing.mp3', 1);
  var cidai = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/cidai.mp3', 1);

  function initAudios() {
    // $.each(app.audios, function(key, value) {
    //   console.log("Key: " + key + ", Value: ");
    //   // app.audios.aCrow.play();
    // });
  }

  return {
    0: cidai,
    1: beijing,
    2: shanghai,
    3: guangzhou,
    4: huhehaote,
    5: xian,
    6: chengdu,
    7: shenzhen,
    8: xiamen,
    9: shenyang,
    10: shaoxing
  };
})();
