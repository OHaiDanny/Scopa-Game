GameFactory = {};

// Factory for creating a new game
GameFactory.createGame = function(playerIds) {
    var deck = createDeck(), // create the deck
        players = createPlayer(playerIds); // assign the players
    
    GameFactory.dealPlayers(players, deck); // deal the players their hand of cards
    
    var table = dealTable(deck); // deal the table
    
    return { // once done, return the db the current saved variables for the game
        deck: deck,
        players: players,
        table: table,
        currentTurn: playerIds,
        inProgress: true,
        started: new Date()
    };
};


/*  ***********************************************************
    Deal the players 3 cards from the top of the deck
*/

GameFactory.dealPlayers = function(players, deck) {
    for (var i = 0; i < 3; i++) { // loop 3 times for each player
        Object.keys(players).forEach(function(id) {
            players[id].hand.push(deck.shift()); // shift() takes from the top of the deck
        });
    }
};


/*  **************************************
    Deal 4 cards to the table
*/
function dealTable(deck) {
    var c = deck.shift.bind(deck); // bind the deck so we have function that we can call 
    return [c(), c(), c(), c()]; // call the function 4 times
}

/*  *******************
    Create Players
*/
function createPlayers(ids) {
    var o = {};
    
    ids.forEach(function(id) {
        o[id] = {
            hand: [],
            pile: [],
            score: {
                mostCoins: 0,
                mostCards: 0,
                setteBello: 0,
                primera: 0,
                scopa: 0
            }
        };
    });
    
    return o;
}



/*  **********************************************************************
    Scopa deck of cards have 4 suits, each suit from 1 to 10. 
    
    1 is Ace
    8 is N
    9 is Q
    10 is K

*/
function createDeck() {
    var suits = ['Cups', 'Coins', 'Swords', 'Clubs' ],
        cards = [];
    
    suits.forEach(function (suits){
       for (var i = 1; i <=10; i++) {
           var name = i;
           if (i===1) name = 'A';
           if (i===8) name = 'N';
           if (i===9) name = 'Q';
           if (i===10) name = 'K';
           
           // After defining the variables, push it into the cards Array
           cards.push({
               suit: suit,
               value: i,
               name: name
           });
       } 
    });
    
    // Meteor's _shuffle function to shuffle the card Array
    return _shuffle(cards);
}
