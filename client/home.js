Template.userList.helpers({
   users:function() {
       return Meteor.user.find();
   } 
});