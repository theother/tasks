Template.sidebar.rendered = function () {
  //Makes sure the sidebars hieght is always 100%
  Tracker.autorun(function () {
    $("#sidebar").height(Math.max($("body").height(),$("#sidebar").height()));
  });
};