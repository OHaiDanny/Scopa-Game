Games = new Meteor.Collection('games');

/*

Collection plan

game = {
    currentTurn = [],
    deck: [],
    table: [],
    players: {
        a: {
            hand:[],
            pile:[],
            score[]
        }
        b: {
            hand:[],
            pile:[],
            score[]
        }
    }
    inProgress: true / false,
    started: date,
    finished: date,
    winner: id

}

*/

if (Meteor.isServer) {
    Meteor.publish('games', function() {
        return Games.find({ currentTurn: this.userId});
    });
    
    Meteor.publish('users', function() {
        return Meteor.users.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('games');
    Meteor.subscribe('users');
}

// available for both client and server
Meteor.methods({
    createGame: function(otherPlayerId) {
        var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
        Games.insert(game);
    },
    takeTurn: function(gameId, id, card) {
        var game = Games.findOne(gameId), 
            hand = game.players[id].hand;
        
        if (game.currentTurn[0] !== id || !Turns.inHand(hand, card)) return; // if it is not your turn or if the card is not in your hand
        
        var match = Turns.getMatch(card, game.table);
        
        if (match) {
            Turns.takeMatch(game, id, card, match);
        } else {
            game.table.push(card);
        }
        
        game.players[id].hand = Turns.removeCard(card, hand);
        game.currentTurn.unshift(game.currentTurn.pop());
        
        if (allHandsEmpty(game.players)) {
            if (game.deck.length > 0) {
                GameFactory.dealPlayers(game.players, game.deck);
            } else {
                scoreGame(game);
            }
        }
        Games.update(gameId, game);
    }
});

function allHandsEmpty(players) {
    return _.every(players, function(player) {
        return player.hand.length === 0;
    });
}