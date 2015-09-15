Meteor.publish('edges', function(networkId) {
    return Edges.find({'networkId' : networkId});
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

