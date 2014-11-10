Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  // notFoundTempalte ':notFound',
});

Router.route('/', {
  name: 'home.link',
  controller: 'home_Controller'
});
