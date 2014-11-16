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
Router.route('/project/:_id', {
  name: 'indvProject.link',
  template: 'indvProject',
  controller: 'indvProject_Controller'
});


