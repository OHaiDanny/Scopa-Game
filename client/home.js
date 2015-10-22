function otherId(game) {
    console.log("game", game);
    return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0];
}

Template.gameList.helpers({
   games: function() {
       return Games.find({inProgress: true}).map(function(game) {
           game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
           game.started = moment(game.started).fromNow();
           return game;
       });
   } 
});



Template.userList.helpers({
   users:function() {
       var myid = Meteor.userId(),
           cantPlayAgainst = [myid];
       
       Games.find({inProgress: true }).forEach(function(game) { // find all games that current user is playing
           cantPlayAgainst.push(otherId(game)); // find who they are playing against and pushing it to the can't play against
       });
       
       
       // find users that their id is not in can't play against
       return Meteor.users.find({ _id: {$not: {$in: cantPlayAgainst}}});
   } 
});

Template.userItem.events({
   'click button': function(evt, template) {
       Meteor.call('createGame', template.data._id);
   } 
});