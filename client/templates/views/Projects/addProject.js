
//***************************************************************/
/* Rec. Vars */
/***************************************************************/
//Page errors
var ap_pageError = new ReactiveVar();

//***************************************************************/
/* Template States */
/***************************************************************/
Template.addProject.rendered = function () {
  //Auto focus on load
  $('#projectName').focus();
};

//Handles closing of error messesages
Template.addProject.rendered = function () {
  $('.closeError').on('click', function() {
    console.log('asd')
    $('#ap_ErrorMessage').fadeOut();
  });
};

//Sets Defualfts upon load
Template.addProject.created = function () {
  ap_pageError.set();
};

// //***************************************************************/
// /* Helpers */
// /***************************************************************/

Template.addProject.helpers({
  //Displays errors
  errorMessage: function () {
    console.log(ap_pageError.get())
    return ap_pageError.get();
  }
});

// //***************************************************************/
// /* Message */
// *************************************************************


Template.addProject.events({
  'click #ap_Save': function (e, tmpl) {
    e.preventDefault();
    
    var name = tmpl.find('#projectName').value.trim();
    var description = tmpl.find('#projectDescription').value;

    if(name === ""){
      $(tmpl.find('.message')).slideDown();
      ap_pageError.set('Please Enter a Project Name');
      tmpl.find('#projectName').focus();
    }

    var newProject = {
      projectName: name,
      projectDescription: description
    };

    console.log(newProject);
  },
  'click #ap_Cancle': function (e) {
    e.preventDefault();
    $('.anti-modal-overlay').fadeOut();
  },
  'click .ap_closeMdoal': function (e) {
    e.preventDefault();
    $('.anti-modal-overlay').fadeOut();
  }
});
