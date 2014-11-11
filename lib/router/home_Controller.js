

home_Controller = RouteController.extend({
  onBeforeAction: function () {
    //Check to see if user is logging-in
    if (Meteor.loggingIn()) {
      this.render('Loading');
    //If user is not logged in show login page
    }else if (!Meteor.user()){
      this.render('loginView');
    //Take user to project page
    }else{
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