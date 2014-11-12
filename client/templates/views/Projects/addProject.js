
//***************************************************************/
/* Rec. Vars */
/***************************************************************/
//Page errors
var ap_pageError = new ReactiveVar();
var TM = TweenMax;
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
    var tl = new TimelineMax();
    tl.to('.ap_ErrorMessage', 0.5, {padding: "0em"})
      .to('.ap_ErrorMessage', 0.5, {opacity: 0}, "-=0.7")
      .to('.ap_ErrorMessage .header', 0.5, {opacity:0}, "-=0.25");
    ap_pageError.set('');
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
    var error = ap_pageError.get();
    var tl = new TimelineMax();
    if (error) {
      tl.to('.ap_ErrorMessage', 0.5, {padding: "1em 1.5em 1em 1.5em"})
        .to('.ap_ErrorMessage', 0.5, {opacity: 1}, "-=0.7")
        .to('.ap_ErrorMessage .header', 0.5, {opacity:1}, "-=0.25");
      return error;
    }
  }
});

// //***************************************************************/
// /* Message */
// *************************************************************


Template.addProject.events({
  'click #ap_Save': function (e, tmpl) {
    e.preventDefault();
    
    //Grab the project input data
    var name = tmpl.find('#projectName').value.trim();
    var description = tmpl.find('#projectDescription').value;
    var user = Meteor.userId();

    //Simple verification to make sure no field is empty
    if(name === ""){
      $(tmpl.find('.message')).slideDown();
      ap_pageError.set('Please Enter a Project Name');
      tmpl.find('#projectName').focus();
    }else if (description === ""){
      ap_pageError.set('Please Enter a Project Description');
      tmpl.find('#projectDescription').focus();
    }else{
      
      //Putting all the projects data into a object
      var newProject = {
        projectName: name,
        projectDescription: description,
        userID: user,
      };

      //Insert the post verified by schema
      Project.insert(newProject, function (e, res) {
        if (e) {
          //If error prompt
          ap_pageError.set(e.message);
        }else{
          //Puting the data in a var will garentee animation close
          var results = new ReactiveVar();
        }
        //Animation close
        Tracker.autorun(function () {
          results.get();
          console.log('inserted: '+res);

          //Varibles
          var tl = new TimelineMax();
          var ap_inpCon = $('#ap_inputContainer'); 
          var ap_sucCon = $('#ap_SuccessContainer');
          var ap_sucTxt = $('#ap_SuccessText');
          var ap_modal = $('.anti-modal-overlay');
          
          //Call function to set display to none
          function displayNone (element) {
            element.hide();
          }

          //Timeline animation
          tl.to((ap_inpCon), 0.5, {autoAlpha:(0), 
              onComplete:(displayNone),
              onCompleteParams:[ap_inpCon]})
            .call(function () {
              ap_sucCon.show();
            })
            .to(ap_sucTxt, 0.5, {opacity:1})
            .to(ap_modal, 1, {opacity: 0})
            .call(function () {
              ap_modal.remove();
            });

        });
      });
    }

    

  },
  //Cancle Button
  'click #ap_Cancle': function (e) {
    e.preventDefault();
    var tl = new TimelineMax();
    var ap_modal = $('.anti-modal-overlay');
    tl.to(ap_modal, 0.5, {opacity: 0})
      .call(function () {
      ap_modal.remove();
    });
  },
  'click .ap_closeMdoal': function (e) {
    e.preventDefault();
    var tl = new TimelineMax();
    var ap_modal = $('.anti-modal-overlay');
    tl.to(ap_modal, 0.5, {opacity: 0})
      .call(function () {
      ap_modal.remove();
    });
  }
});
