
//Add page error, with user permisions

//***************************************************************/
/* Rec Var */
/***************************************************************/
var rm_pageError = new ReactiveVar();

//***************************************************************/
/* Template States */
/***************************************************************/

//***************************************************************/
/* Helpers */
/***************************************************************/

Template.removeProject.helpers({
    projectName: function  () {
    return Session.get('removeProjectName');
  }
});

//***************************************************************/
/* Events */
/***************************************************************/

function removeModal () {
  var tl = new TimelineMax();
  var ap_modal = $('.anti-modal-overlay');
  tl.to(ap_modal, 0.5, {opacity: 0})
      .call(function () {
      ap_modal.remove();
      //Reset project name
      Session.set('removeProjectName', null);
      Session.set('removeProjectActive', false);
    });
}
Template.removeProject.events({
  'click #rm_CancelButton': function () {
    removeModal();
  },
  'click .ap_closeMdoal': function () {
    removeModal();
  },
  'click #rm_deleteButton': function () {
    var project = Session.get('removeProjectName');
    var projectID = project._id;

    //Timeline Var
    var tl = new TimelineMax();
    var rm_Prompt = $('.rm_Prompt');
    var rm_Deleted = $('.rm_Deleted');

    //Timeline Function
    function displayNone (element) {
      element.remove();
    }

    //Remove Project
    Project.remove({_id: projectID}, function  (err, res) {
      if (err) {
        //Error with permistions
        console.log(err);
      }else{
        //Remove animation
        tl.to(rm_Prompt, 0.5, {autoAlpha:(0),
            onComplete:(displayNone),
            onCompleteParams:[rm_Prompt]})
          .call(function  () {
            Session.set('removeProjectActive', false);
          })
          .to(rm_Deleted, 0, {display: 'block'})
          .to(rm_Deleted, 0.5, {opacity: 1})
          .call(function  () {
            removeModal();
          });
        }
    });
  }
});