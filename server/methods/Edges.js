Meteor.methods({
    addEdge : function (networkId, sourceId, targetId, name) {
        Edges.insert({
            group: 'edges',
            data: {
                id: 'edge' + Math.round( Math.random() * 1000000 ),
                "source" :sourceId,
                "target" :targetId,
                "name" : name
            },
            networkId : networkId,
            createdAt: new Date(),            // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username  
        });
    },

    deleteEdge : function(edgeId) {
        var edge = Edges.findOne({ "data.id" : edgeId });
        Edges.remove(edge);
    },

});
