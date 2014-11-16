
//***************************************************************/
/* Varibles */
/***************************************************************/
//Determis if user is removing a project
Session.set('removeProjectActive', false);

//Determis what the sidebar displayes based on users location
Session.set('userLocation', 'home');


//***************************************************************/
/* Template States*/
/***************************************************************/
Template.sidebar.rendered = function () {
  //Makes sure the sidebars hieght is always 100%
  $("#sidebar").height(Math.max($("body").height(),$("#sidebar").height()));
  $( window ).resize(function() {
    $("#sidebar").height(Math.max($("body").height(),$("#sidebar").height()));
  });
};

//***************************************************************/
/* Helpers */
/***************************************************************/
Template.sidebar.helpers({
  projectHome: function () {
    var userLocation = Session.get('userLocation');
    if (userLocation === 'home') {
      return true;
    }else{
      return false;
    }
  }
});

//***************************************************************/
/* Events */
/***************************************************************/
Template.sidebar.events({
  'click #addProject': function () {
    Session.set("addNewProject", true);
    //Invalidate remove session
    Session.set('removeProjectActive', false);
    AntiModals.overlay('addProject');
  },
  //Initial click to remove project
  'click #removeProject': function  () {
    var tl = new TimelineMax();
    var rml = $('.removeLable');
    tl.to(rml, 0, {display: 'block'})
      .to(rml, 0.25, {opacity: 1});
    Session.set('removeProjectActive', true);
  },
  //If user wishes to cancle the remove project action
  'click #cancleRemoveProject': function () {
    var tl = new TimelineMax();
    var rml = $('.removeLable');
    tl.to(rml, 0, {opacity: 0})
      .to(rml, 0.25, {display: 'none'});
    Session.set('removeProjectActive', false);
  },
  'click #logout': function (e) {
    e.preventDefault();
    Meteor.logout();
  }
});


//***************************************************************/
/* Helpers */
/***************************************************************/
Template.sidebar.helpers({
  removeProject: function () {
    return Session.get('removeProjectActive');
  }
});