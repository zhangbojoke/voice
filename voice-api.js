var voiceApi = (function() {

  var opts = {
    maxRecordTimeMs: 10000,
    onUploadStart: function() {
      console.log('onUploadStart');
    },
    onUploadSuccess: function(rsp) {
      alert(JSON.stringify(rsp));
    },
    onUploadError: function(rsp) {
      alert('[onUploadError] ' + JSON.stringify(rsp));
    }
  };
  var voice = {};
  var started = false;
  var stopRecordId = 0;

  function addVoice(mediaId) {
    $.ajax({
      url: 'api/?a=add',
      type: 'POST',
      dataType: 'json',
      // timeout: 5000,
      data: {
        media_id: mediaId
      },
      beforeSend: function() {},
      success: function(data) {
        // if (data.code === 0) {
        //   console.log('处理成功');
        //   opts.onUploadSuccess && opts.onUploadSuccess(data.data);
        // } else {
        //   opts.onUploadError && opts.onUploadError(data.msg);
        // }
      },
      error: function(xhr, errorType, error) {
        // opts.onUploadError && opts.onUploadError('请求失败: ' + error);
      },
      complete: function() {}
    });
  }

  function getRandomVoice() {
    $.ajax({
      url: 'api/',
      type: 'POST',
      dataType: 'json',
      // timeout: 5000,
      data: {
      },
      beforeSend: function() {},
      success: function(data) {
        if (data.code === 0) {
          console.log('处理成功');
          opts.onUploadSuccess && opts.onUploadSuccess(data.data);
        } else {
          opts.onUploadError && opts.onUploadError(data.msg);
        }
      },
      error: function(xhr, errorType, error) {
        opts.onUploadError && opts.onUploadError('请求失败: ' + error);
      },
      complete: function() {}
    });
  }

  function uploadVoice(localId) {
    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function(res) {
        voice.serverId = res.serverId;
        addVoice(res.serverId);
      }
    });
  }

  function startRecord() {
    console.log('[startRecord]');
    started = true;

    if (!opts.isMock) {
      wx.startRecord({
        cancel: function() {
          alert('用户拒绝授权录音');
        }
      });
    }
    stopRecordId = setTimeout(stopRecord, opts.maxRecordTimeMs);
  }

  function stopRecord() {
    console.log('[stopRecord] started:', started, opts.isMock);
    if (!started) return;
    started = false;
    clearTimeout(stopRecordId);

    opts.onUploadStart && opts.onUploadStart();

    getRandomVoice();

    wx.stopRecord({
      success: function(res) {
        voice.localId = res.localId;
        uploadVoice(voice.localId);
      },
      fail: function(res) {
        alert(JSON.stringify(res));
      }
    });
  }

  function init(argOpts) {
    opts = $.extend(opts, argOpts);

    // 监听录音播放停止
    wx.onVoicePlayEnd({
      complete: function(res) {
        started = false;
        voice.localId = res.localId;
        uploadVoice(voice.localId);
      }
    });
  }

  return {
    init: init,
    startRecord: startRecord,
    stopRecord: stopRecord
  };

})();
