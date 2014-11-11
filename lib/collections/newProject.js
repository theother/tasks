Projects = new Mongo.Collection('projects');

var Schemas = {};

Schemas.newProject = new SimpleSchema({
    name: {
        type: String,
        label: "Title",
        max: 100
    },
    author: {
        type: String,
        label: "Author",
        max: 1000
    },
    createdAt: {
        type: Date
    }
});

Projects.attachSchema(Schemas.Projects);