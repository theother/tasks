Template.sidebar.rendered = function () {
  //Makes sure the sidebars hieght is always 100%
  $("#sidebar").height(Math.max($("body").height(),$("#sidebar").height()));
  $( window ).resize(function() {
    $("#sidebar").height(Math.max($("body").height(),$("#sidebar").height()));
  });

};


//***************************************************************/
/* Events */
/***************************************************************/
Template.sidebar.events({
  'click #logout': function (e) {
    e.preventDefault();
    Meteor.logout();
  }
});