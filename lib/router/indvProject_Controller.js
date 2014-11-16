

indvProject_Controller = RouteController.extend({
  onBeforeAction: function () {
    Session.set('userLocation', 'indvProject');
    this.next();
  },
  data: function () {
    var currentProjectID = this.params._id;
    Session.set('currentProjectID', currentProjectID);
    return {
      test: function () {
        //console.log(this.params._id)
        //return Project.find({_id: this.params});
      }
    }
  },
  action: function () {
    this.render('currentProject');
  } 
});
