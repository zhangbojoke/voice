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

  var voice1 = new myAudio('./voice-1.mp3', 1);
  var voice2 = new myAudio('./voice-2.mp3', 1);
  var voice3 = new myAudio('./voice-3.mp3', 1);
  var voice4 = new myAudio('./voice-4.mp3', 1);
  var voice5 = new myAudio('./voice-5.mp3', 1);
  var voice6 = new myAudio('./voice-6.mp3', 1);
  var cidai = new myAudio('http://p3.ifengimg.com/29b92e35b2b20708/2016/52/cidai.mp3', 1);
  function initAudios() {
    // $.each(app.audios, function(key, value) {
    //   console.log("Key: " + key + ", Value: ");
    //   // app.audios.aCrow.play();
    // });
  }

  return {
    0: cidai,
    1: voice1,
    2: voice2,
    3: voice3,
    4: voice4,
    5: voice5,
    6: voice6
  };
})();
