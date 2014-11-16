
//***************************************************************/
/* Template States */
/***************************************************************/

Template.cp_SortMenu.rendered = function () {
  //Activate Dropdown
  $('.ui.dropdown').dropdown();
  
};

//***************************************************************/
/* Helpers */
/***************************************************************/

Template.cp_SortMenu.helpers({
  projectTitle: function (e, tmpl) {
    console.log(e)
    console.log(tmpl)
    console.log(this)
  }
});