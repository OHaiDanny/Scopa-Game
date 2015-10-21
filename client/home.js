Template.userList.helpers({
   users:function() {
       var myId = Meteor.userId(),
           cantPlayAgainst = [myId];
       
       Games.find({inProgress: true }).forEach(function (game) { // find all games that current user is playing
           cantPlayAgainst.push(game.currentTurn[game.currentTurn[0] === myId ? 1 : 0]); // find who they are playing against and pushing it to the can't play against
       });
       
       
       // find users that their id is not in can't play against
       return Meteor.users.find({ _id: {$not: {$in: cantPlayAgainst}}});
   } 
});

Template.userItem.events({
   'click button': function(evt, template) {
       
   } 
});