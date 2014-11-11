
//***************************************************************/
/* Reactive Varibles */
/***************************************************************/
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


//***************************************************************/
/* Template States */
/***************************************************************/
Template.loginPrompt.rendered = function() {
  //Auto focue on username upon load
  $("#username").focus();
};


//Sets Defualfts upon load
Template.loginPrompt.created = function () {
  pageError.set(null);
  registerSession.set(false);
  registerFormShow.set(false);
  alreadyMember.set(false);
  loginHeader.set(false);
};


//***************************************************************/
/* Display control logic */
/***************************************************************/
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
      $('.signUpContainer').slideUp(400, function () {
        $('.registerForm').fadeOut(200);
        $('.alreadyMember').fadeOut(200);
        setTimeout(function  () {
          //Button fade back in for better ux
          $('.signUpContainer').slideDown();
        }, 150);
      });
      //Show the login form
      $('.registerAnimationContainer').slideDown("slow");
  }
});


//***************************************************************/
/* Helpers */
/***************************************************************/
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
  },
  //Displays erros on login form
  errorMessage: function () {
    $('.message').slideDown();
    return pageError.get();
  }
});

Template.registerForm.helpers({
  //Displays Errors on reg form
  errorMessage: function () {
    $('.message').slideDown();
    return pageError.get();
  }
});


/***************************************************************/
/* Events */
/***************************************************************/
Template.loginPrompt.events({
  'submit #login_form': function (e, tpl) {
    e.preventDefault();
    var loginUsername = tpl.find('#username').value.trim();
    var loginPassword = tpl.find('#password').value;


    //Simple login verification if blank
    if (loginUsername === "" || loginUsername.length < 3) {
      $(tpl.find('.message')).slideDown();
      pageError.set("Please Enter A Valid Username");
      tpl.find('#username').focus();
    }else if (loginPassword === "" || (loginPassword.length < 5)) {
      $(tpl.find('.message')).slideDown();
      pageError.set("Password Must Be Five Characters Or Longer");
      tpl.find('#password').focus();
    }else{
      //Login
      Meteor.loginWithPassword(loginUsername, loginPassword, function (e) {
        if(e) {
          pageError.set(e.message);
          return false;
        }else{
          pageError.set(null);
        }
      });
      return false;
    }
  },
  //Display reg form
  'click #signUpButton': function (e) {
    e.preventDefault();
    registerSession.set(true);
    loginHeader.set(true);
    pageError.set(null);
    setTimeout(function  () {
      registerFormShow.set(true);
    }, 500);
  },
  //Hide the form if already a memeber
  'click .alreadyMember': function () {
    //Set Defualt back
    alreadyMember.set(true);
    registerSession.set(false);
    loginHeader.set(false);
    pageError.set(null);
    setTimeout(function  () {
      registerFormShow.set(false);
      alreadyMember.set(false);
    }, 500);
  },
  'submit #register_Form': function (e, tpl) {
    e.preventDefault();
    //Grab the user reg data
    var registerName = tpl.find('#usernameRegister').value.trim();
    var registerEmail = tpl.find('#emailRegister').value.trim();
    var registerPassword = tpl.find('#passwordRegister').value;
    var registerVerification = tpl.find('#passwordVerification').value;

    //Basic password length verification
    if(registerPassword.length < 5){
      pageError.set('Password Must Be atleast 5 Characters Long');
      $('#passwordRegister').focus();
    }else if(registerPassword !== registerVerification){
      //Password match verification
      pageError.set('Passwords Must Match');
      $('#passwordRegister').focus();
    }else{
      //Put user data in obj
      var newUser = {
        username: registerName,
        email: registerEmail,
        password: registerPassword,
      };

      //Added user, checked by shcema
      Accounts.createUser(newUser, function (e) {
        if (e) {
          //Display errors if any
          pageError.set(e.message);
        }else{
          console.log('added');
        }
      });
    }
  },
  //Close error message on close click
  'click .message .close': function (e, tpl) {
    var close = tpl.find('.message');
    $(close).slideUp();
    pageError.set(null);
  }
});

Template.registerForm.events({
  'click .message .close': function (e, tpl) {
    var close = tpl.find('.message');
    $(close).slideUp();
    pageError.set(null);
  }
});