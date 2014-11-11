Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  // notFoundTempalte ':notFound',
});

//Home Route
Router.route('/', {
  name: 'home.link',
  controller: 'home_Controller'
});

//New Project
Router.route('/newProject', {
  name: 'newProject.link',
  template: 'newProject',
  controller: 'newProject_Controller'
});


