Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', { path: '/'});
    this.route('play', { 
        path: '/game/:_id',
        data: function() {
            var game = Games.findOne(this.params._id);     // find the current played game
            
            game.player = game.players[Meteor.userId()];
            game.yourTurn = game.currentTurn[0] === Meteor.userId(); // find who's turn is it
            
            var otherId = game.currentTurn[game.yourTurn] ? 1 : 0; // store the other player ID
            game.otherPlayer = { // info on the other player
                username: Meteor.users.findOne(otherId).username;
                score: game.player[otherId].score;
            }
            
            return game;
        }           
    });
});