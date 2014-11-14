

home_Controller = RouteController.extend({
  onBeforeAction: function () {
    //Check to see if user is logging-in
    if (Meteor.user() === undefined) {
      this.render('Loading');
    }else if (Meteor.user() && !Meteor.loggingIn()){
      this.next();
    }else if (!Meteor.user() && !Meteor.loggingIn()){
      this.render('loginView');
    }else{
      this.next();
    }
  },
  waitOn: function () {
    if (Meteor.user() && !Meteor.loggingIn()) {
      return  Meteor.subscribe('project', this.params._id);
    }else{
      return;
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

// home_Controller.events({
//   'click #addProject': function () {
//     Session.set("addNewProject", true);
//     AntiModals.overlay('addProject');
//   }
// });