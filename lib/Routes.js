Router.configure({
  layoutTemplate: 'Layout',
  // loadingTemplate: 'Loading',
  // notFoundTempalte ':notFound',
});

Router.route('/register', {
  name: 'register.link',
  layoutTemplate: 'registerView',
  controller: 'register_Controller'
});
