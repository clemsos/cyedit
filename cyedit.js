if( Meteor.isClient ){
  // client code
}

if (Meteor.isServer) {
    Meteor.startup(function () {
      // Meteor.call("resetNetworkData"); // reset all nodes and edges
          Nodes.remove({});
          Edges.remove({});
    });
}
