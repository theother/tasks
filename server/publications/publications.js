
//***************************************************************/
/* Publications */
/***************************************************************/


Meteor.publish("project", function () {
  return Project.find({userID: this.userId});
});