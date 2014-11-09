
//////These var's control the display of the page
//Removes the login form
var registerSession = new ReactiveVar(); 
//Displays reg form
var registerFormShow = new ReactiveVar();
//Allows the user to go back if they are a member 
var alreadyMember = new ReactiveVar(); 
//Login header display
var loginHeader = new ReactiveVar(); 


//Controls the error haneling
var pageError = new ReactiveVar();

Template.loginPrompt.rendered = function() {
  //Auto focue on username upon load
  $("input[name='Username']").focus();
};

Template.loginPrompt.created = function () {
  //Defuals upon page load
  pageError.set('errorMessage', '');
  registerSession.set(false);
  registerFormShow.set(false);
  alreadyMember.set(false);
  loginHeader.set(false);
};

//Logic that conrolls what is displayed
Tracker.autorun(function () {
  var register = registerSession.get();
  //If the sign up button is clicked
  if (register) {
    //Hide login form
    $('.registerAnimationContainer').fadeOut("slow");
    //Show reg from
    $('.signUpContainer').fadeOut("slow", function () {
       $('.signUpContainer').slideDown();
    });
  }
  //If the user clicks 'already a member'
  if (alreadyMember.get()) {
      //Close the reg form
      $('.signUpContainer').slideUp(300, function () {
        $('.registerForm').fadeOut(400);
        $('.alreadyMember').fadeOut(400);
        setTimeout(function  () {
          //Button fade back in for better ux
          $('.signUpContainer').fadeIn();
        }, 500);
      });
      //Show the login form
      $('.registerAnimationContainer').fadeIn("slow");
  }
});


Template.loginPrompt.helpers({
  //If true the login form will be injected into template
  ifRegister: function () {
    return registerFormShow.get();
  },
  loginHeaderDisplay: function () {
    var text = loginHeader.get();
    if (text) {
      return "Registar";
    }else{
      return "Login";
    }
  }
});


Template.loginPrompt.events({
  //Form display
  'click #signUpButton': function (e) {
    e.preventDefault();
    registerSession.set(true);
    loginHeader.set(true);
    setTimeout(function  () {
      registerFormShow.set(true);
    }, 500);
  },
  //Hide the form if already a memeber
  'click .alreadyMember': function () {
    alreadyMember.set(true);
    registerSession.set(false);
    loginHeader.set(false);
    setTimeout(function  () {
      registerFormShow.set(false);
      alreadyMember.set(false);
    }, 500);
  }
});