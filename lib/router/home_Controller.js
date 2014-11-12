

home_Controller = RouteController.extend({
  onBeforeAction: function () {
    //Check to see if user is logging-in
    if (Meteor.user() && !Meteor.loggingIn()) {
      console.log('one')
      this.next();
    }else if (!Meteor.user() || Meteor.loggingIn()){
      console.log('two')
      this.render('loginView');
    }
    else{
      this.next();
    }
  },
  data: function () {
    return {
      Project: function () {
        return Project.find({});
      }
    };
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