
//***************************************************************/
/* Template States */
/***************************************************************/

Template.currentProject.rendered = function () {
    //Controls the task header size since css wont do the trick
  var headerWidth = {
    containerSize: function () {
      return {
        outer: $('#cp_TaskContainer').outerWidth(),
        center: $('#cp_CenterTaskContainer').outerWidth()
      };
    },
    resize: function () {
      var container = this.containerSize();
        $('.cp_StartHeaderTitle').css('width', container.outer);
        $('.cp_ProgressHeaderTitle').css('width', container.center);
        $('.cp_CompletedHeaderTitle').css('width', container.outer);
    },
    windowResize: function () {
      var self = this;
      $( window ).resize(function() {
        self.resize();
      });
    }
  };
  headerWidth.resize();
  headerWidth.windowResize();

};