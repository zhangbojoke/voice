(function() {
  app.initPages = function() {
    $.each(app.pages, function(key, value) {
      // console.log("Key: " + key + ", Value: ", value);
      if (app.pages[key].init) {
        app.pages[key].init();
      }
    });
    app.dialogs.init();
  };

  app.showPage = function(nextPage, branch) {
    var cp = app.currentPage;
    if (cp !== 0 && !app.pages[cp].isFlipReady) {
      return false;
    }
    if (app.pages[nextPage]) {
      var dependingTask = app.pages[nextPage].dependingTask;
      if (app.isMultiLoad && !app.loader.isTaskDone(dependingTask)) {
        app.showDialog('loading');

        var task = app.loader.currentTask;
        // console.log('.....dependingTask,task',dependingTask,task.id);
        if(task.id != dependingTask ){
          task.pause();
          task = app.loader.getNextTask(dependingTask);
          task.load();
        }
        task.all = function() {
          app.showPage(nextPage);
        };
        return false;
      }
      app.closeDialog('loading');
      if (nextPage == 3) {
        $('.page').not('.p' + nextPage).hide();
        $('.p' + nextPage).show();
      } else {
        $('.page').not('.p' + nextPage).fadeOut(500);
        $('.p' + nextPage).fadeIn(500);
      }
      
      if (app.pages[cp] && app.pages[cp].onLeave) {
        app.pages[cp].onLeave();
      }
      if (app.pages[nextPage].onLoad) {
        app.pages[nextPage].onLoad();
      }
      app.currentPage = nextPage;
      window._hmt && _hmt.push(['_trackEvent', '进入页面', '进入第' + nextPage + '页']);
    }
  };


  app.showDialog = function(dname) {
    $('.dialog').fadeOut(300);
    $('.d-' + dname).fadeIn(300);
  };
  app.closeDialog = function(dname) {
    $('.d-' + dname).fadeOut(300);
    // console.log('closeDialog');
  };

}());
