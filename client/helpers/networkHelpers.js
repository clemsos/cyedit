// networks index
Template.networks.helpers({
    'networks': function(){
        return networks = Networks.find({}, {sort: {name: 1}}).fetch();
    }
});


// single network
Template.network.created = function(){
    var self = this;
    var networkId = this.data.networkId;
    this.network = new ReactiveVar();
    this.changeLayout = new ReactiveVar();
};


Template.network.rendered = function () {
    var self = this;
    var networkId = this.data.networkId;

    // set as reactive var

    // create graph// network.destroy();
    var network  = NetworkGraph.initNetwork(networkId);
    Template.instance().network.set(network);

    // fetch data
    Tracker.autorun(function(){
        var nodes = Nodes.find().fetch();
        var edges = Edges.find().fetch();
        console.log("fetch for ",networkId, nodes .length, "nodes", edges .length, "edges" );
        // console.log(nodes, edges);
        if(network)  network.updateNetworkData(nodes,edges);
    });

    // layout function
    var changeLayout  = function (layoutName) {

        // callback
        var savePositions = function () {
            console.log("update position ");
            //   for (var i = 0; i < net.nodes().length; i++) {
            //         var node = net.nodes()[i];
            //         Meteor.call("updateNodePosition", node.id(), node.position())
            //     }
            }

            var layout = network.net.makeLayout({ 
                name: layoutName,
                stop: savePositions // callback on layoutstop
            });
        
            console.log(layout);

            layout.run();
        }

        Template.instance().changeLayout.set(changeLayout);
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
