Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', { path: '/'});
    this.route('play', { path: '/game/:_id'});
});