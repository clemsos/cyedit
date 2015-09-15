//
Template.networks.helpers({
    'networks': function(){
        var networks = Networks.find({}, {sort: {name: 1}}).fetch();
        console.log(networks);
        return networks
    }
});

Template.network.onCreated(function(){

    var self = this;
    var networkId = this.data.networkId;

    console.log("subscribed for ", networkId);

    self.autorun(function () {
        self.subscribe('nodes', networkId);
        self.subscribe('edges', networkId);
    });

});

// Template.network.helpers({

//     nodes : function(){
//         Meteor.
//     },
//     edges : function(){
//         var networkId = this.data.networkId;
//     }
// });

Template.network.rendered = function () {

    var networkId = this.data.networkId;
    console.log(networkId);

    // create graph// network.destroy();
    this.network  = NetworkGraph.initNetwork(networkId);


    // track changes
    var self = this;

    Tracker.autorun(function(){

        // fetch data
        var nodes = Nodes.find().fetch();
        var edges = Edges.find().fetch();

        console.log("fetch nodes for ",networkId, "nodes", nodes .length);
        if(self.network) self.network.updateNetworkData(nodes,edges);

    });
};

Template.network.onDestroyed(function(){
    this.network.net.destroy();
    delete(this.network)
    console.log("network destroyed", this.network);
})

Template.infobox.helpers({

    onSuccess: function () {
        return function (res, val) {
            Meteor.call("updateNameByType", Session.get('currentId'), Session.get('currentType'), val);
        }
    },

     currentSelection: function() {
        var id= Session.get('currentId'),
            type = Session.get('currentType'),
            item = {};

       if( type == "node") {
            item= Nodes.findOne({"data.id" : id});
        } else if (type== "edge"){
            item= Edges.findOne({"data.id" : id});
        }

        return item;
    }
})
