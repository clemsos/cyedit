Meteor.publish('edges', function(networkId) {
    var edges = Edges.find({'networkId' : networkId});
    console.log(networkId, edges.count());
    return edges; 
});

Meteor.publish('nodes', function (networkId) {
    var nodes = Nodes.find({'networkId' : networkId});
    // console.log("networkId", networkId, "nodes : ", nodes.fetch().length);
    return nodes;
});

Meteor.publish('comments', function() {
    return Comments.find();
});

Meteor.publish('networks', function() {
    return Networks.find();
});

