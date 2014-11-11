

home_Controller = RouteController.extend({
  onBeforeAction: function () {
    //Check to see if user is logging-in
    if (Meteor.user() && !Meteor.loggingIn()) {
      this.next();
    }else if (!Meteor.user()){
      this.render('loginView');
    }
    else{
      this.next();
    }
  },
  action: function () {
    this.render('userView');
  } 
});

home_Controller.events({
  'click #addProject': function () {
    console.log('click')
    Session.set("addNewProject", true);
    AntiModals.overlay('addProject');
  }
});