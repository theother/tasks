
home_Controller = RouteController.extend({
  onBeforeAction: function () {
    //Check to see if user is logging-in
    if (Meteor.loggingIn()) {
      //display loader page
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