Meteor.methods({

    createNetwork : function (name) {
        Networks.insert({
            "name" : name,
            createdAt: new Date(),            // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username  // username of logged in user
        })
    },

    removeNetwork : function (_id) {
        Networks.remove({ "_id" : _id});
    },

    // modify network elements
    updateNetworkElesName :function (itemId, type, newName) {
        if( type == "node") {
            var node = Nodes.findOne({ "data.id" : itemId });

            //update coords in DB 
            Nodes.update({ 
                _id: node._id
            }, {
                $set: { "data.name": newName }
            });
        } else if (type == "edge"){
            var edge = Edges.findOne({ "data.id" : itemId });
            Edges.update({
                _id: edge._id
            }, {
                $set: { "data.name": newName }
            });
        }
    },

    createRandomNetworkData : function(networkId){

        console.log("add random nodes and edges for", networkId);
        // add random Nodes
        for(i = 0; i < 20; i++){
            var name =  getRandomWord();
            var nodeId =  'node' + Math.round( Math.random() * 1000000 );
            var node = makeNode(networkId)
            Meteor.call("addNode", node);
        }

        // add Edges
        for(i = 0; i < 25; i++){
            var name =  getRandomWord();
            var source = Random.choice(Nodes.find({networkId : networkId}).fetch());
            var target = Random.choice(Nodes.find({_id:{$ne:source._id}, networkId : networkId}).fetch());//make sure we dont connect to the source
            var edge = makeEdge(networkId, source.data.id, target.data.id);
            Meteor.call("addEdge", edge);
        }
    },

    destroyNetworkData: function(networkId) {
        console.log("delete all existing nodes and edges for", networkId);
        Nodes.remove({"networkId": networkId})
        Edges.remove({"networkId" : networkId})
    },

    resetNetworkData : function(networkId) {
        console.log("reset data for", networkId);
        Meteor.call("destroyNetworkData", networkId);
        Meteor.call("createRandomNetworkData", networkId);
    }
})
