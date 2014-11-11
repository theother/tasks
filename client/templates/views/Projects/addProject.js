
//***************************************************************/
/* Rec. Vars */
/***************************************************************/
//Page errors
var ap_pageError = new ReactiveVar();
var ap_Success = new ReactiveVar();

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
  ap_Success.set(false);
};

// //***************************************************************/
// /* Helpers */
// /***************************************************************/

Template.addProject.helpers({
  //Displays errors
  errorMessage: function () {
    return ap_pageError.get();
  },
  ap_Success: function () {
    return ap_Success.get();
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
      
      //Make a method call to grab the date
      if (Session.get('date') === undefined) {
        console.log('date got');
        Meteor.call('getDate', function (e, res) {
          if (e) {console.log(e);}
          return Session.set('date', res);
        }); 
      }else{
        //Putting all the projects data into a object
        var newProject = {
          projectName: name,
          projectDescription: description,
          userID: user,
          createdAt: Session.get('date')
        };
      }

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
          $('#ap_inputContainer').fadeOut('slow', function () {
          });
            setTimeout(function () {
              ap_Success.set(true);
              $('#ap_SuccessText').fadeOut(100);
            }, 700);
            setTimeout(function () {
              $('#ap_SuccessText').fadeIn();
            }, 900);
            setTimeout(function () {
              $('.anti-modal-overlay').fadeOut();
              ap_Success.set(false);
            }, 1300);
            setTimeout(function () {
              $('.anti-modal-overlay').remove();
            }, 2500);
        });
      });
    }

    

  },
  'click #ap_Cancle': function (e) {
    e.preventDefault();
    $('.anti-modal-overlay').fadeOut();
    setTimeout(function () {
      $('.anti-modal-overlay').remove();
    }, 1200);
  },
  'click .ap_closeMdoal': function (e) {
    e.preventDefault();
    $('.anti-modal-overlay').fadeOut();
    setTimeout(function () {
      $('.anti-modal-overlay').remove();
    }, 1200);
  }
});
