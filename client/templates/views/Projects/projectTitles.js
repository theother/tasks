

//Invalidated remove project session
//So if a user clicks 'add' project the remove session will invalidate
//Or clicks off the page, ect.
Tracker.autorun(function () {
  Session.get('removeProjectActive');
  var removeProjectActive = Session.get('removeProjectActive');
  if (!removeProjectActive) {
    var tl = new TimelineMax();
    var rml = $('.removeLable');
    tl.to(rml, 0, {opacity: 0})
      .to(rml, 0.25, {display: 'none'});
  }
});

//***************************************************************/
/* Helpers */
/***************************************************************/
Template.projectTiles.helpers({
  addNewProject: function () {
    return Session.get('addNewProject');
  }
});

//***************************************************************/
/* Events */
/***************************************************************/
Template.projectTiles.events({
  'click #removeProjectLable': function () {
    Session.set('removeProjectName', this);
    AntiModals.overlay('removeProject');
  }
});
