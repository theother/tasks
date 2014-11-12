
Project = new Mongo.Collection('project');
//***************************************************************/
/* Schema */
/***************************************************************/
var Schemas = {};

Schemas.Project = new SimpleSchema({
    projectName: {
        type: String,
        label: "Title",
        min: 3,
        max: 100
    },
    projectDescription: {
        type: String,
        label: "Description",
        optional: true,
        max: 10000
    },
    userID: {
        type: String,
    },
    created: {
        type: Date,
        label: "Created Date",
        autoValue: function () {
            if (this.isInsert) {
              return new Date;
            } else {
              this.unset();
            }
        }
    }
});

Project.attachSchema(Schemas.Project);

//***************************************************************/
/* Permissions */
/***************************************************************/

Project.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


//***************************************************************/
/* Methods */
/***************************************************************/

//Gets the date for new projects
Meteor.methods({
    getDate: function () {
        var date = new Date();
        return date;
    }
});