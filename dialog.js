app.dialogs = (function() {

  return {
    init: function() {
      $('.d-share').click(function() {
        app.closeDialog('share');
        return false; // 阻止事件冒泡
      });
    }
  };

})();
