Meteor.methods({

    addNode: function (networkId, nodeId, name) {
        Nodes.insert({
            group: 'nodes',
            data: {
                id: nodeId,
                starred : false,
                group : _.random(0,5), // add group
                name : name
            },
            position: {
                x: Math.random() *800,
                y: Math.random() *600
            },
            networkId : networkId,
            createdAt: new Date(),            // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username  
        });
    },

    deleteNode: function (nodeId) {
        var node = Nodes.findOne({ "data.id" : nodeId });
        Nodes.remove(node);
    },

    updateNodePosition : function(nodeId, position){
        var node = Nodes.findOne({ "data.id" : nodeId });
        //update coords in DB 
        Nodes.update({
            _id: node._id
        }, {
            $set: { position: position }
        });
    },

    lockNode : function(nodeId, position){
        var node = Nodes.findOne({ "data.id" : nodeId });
        var locked = node.locked ? false : true;
        Nodes.update({
            _id: node._id
        }, {
            $set: { "locked": locked, "position" : position }
        });
    },

    starNode : function(nodeId) {
        var node = Nodes.findOne({ "data.id" : nodeId });
        var starred = node.data.starred ? false : true;
        Nodes.update({
            _id: node._id
        }, {
            $set: { "data.starred": starred }
        });
    },

});
