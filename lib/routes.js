// Default routing settings
Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: '404'
});

Router.onBeforeAction(function(pause) {
  if (! Meteor.userId()) {
    this.render('login');
    this.pause();
  }
  this.next() 
});


Router.route('/', {
    waitOn: function () {
      return Meteor.subscribe('networks');
    },
    action : function() {
        if (!this.ready()) 
            this.render("loading");
        else
            this.render('networks');
    }
});


Router.route('/networks', {
    waitOn: function () {
      return Meteor.subscribe('networks');
    },
    action : function() {
        if (!this.ready()) 
            this.render("loading");
        else
            this.render('networks');
    }
});

Router.route('/networks/:networkId', {
    waitOn: function () {
        return [
            Meteor.subscribe('nodes', this.params.networkId),
            Meteor.subscribe('edges', this.params.networkId)
        ]
    },

    action: function () {
        if (!this.ready())  this.render("loading");
        else this.render('network', { data : {"networkId" : this.params.networkId} });
    }
});


Router.route('/networks/:networkId/nodes', {
    waitOn: function () {
        return Meteor.subscribe('nodes', this.params.networkId)
    },
    action: function () {
        if (!this.ready())  this.render("loading");
        else this.render('nodes', { data : {"networkId" : this.params.networkId} });
    }
});

Router.route('/networks/:networkId/edges', {
    waitOn: function () {
        return Meteor.subscribe('edges', this.params.networkId)
    },
    action: function () {
        if (!this.ready())  this.render("loading");
        else this.render('edges', { data : {"networkId" : this.params.networkId} });
    }
});

Router.route('/networks/:networkId/import', {
    action: function () {
        if (!this.ready())  this.render("loading");
        else this.render('import', { data : {"networkId" : this.params.networkId, "type" : "nodes" } });
    }
});
