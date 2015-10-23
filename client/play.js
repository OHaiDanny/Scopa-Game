Template.registerHelper('equals', function(a,b) {
    return a === b;
});

Template.hand.events({
    'click .card': function(evt, template) {
        if (template.data.yourTurn) {
            Meteor.call('takeTurn', template.data._id, Meteor.userId(), this); // this is the clicked card
        }
    }
});