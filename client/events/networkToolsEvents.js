Template.networkTools.onCreated(function(){
    // console.log(this.view.parentView().instance().changeLayout.get());
});

Template.networkTools.events = {

    // add/remove nodes
    "click #add-node" :  function(){ 
        var nodeId =  'node' + Math.round( Math.random() * 1000000 );
        var node = makeNode(nodeId);
        Meteor.call("addNode", node);
    },

    // add random nodes 
    "click #init-data": function(){
        Meteor.call("resetNetworkData", this.networkId); 
    },

    // layouts
    'click #colaLayout' : function(){ changeLayout("cola"); },
    'click #randomLayout' : function(){ changeLayout("random") },
    'click #circleLayout' : function(){ changeLayout("circle") },
    'click #gridLayout' : function(){ changeLayout("grid") },

    // toggle add/remove edges feature
    'click #draw-edgehandles' : function(){

        // var edgeHandlesOn = Session.get('edgeHandlesOn') == "drawoff" ? "drawon" : "drawoff";
        
        // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'disable' ? 'enable' : 'disable';
        var edgeHandlesOn = Session.get('edgeHandlesOn') ? false : true ;
        Session.set('edgeHandlesOn', edgeHandlesOn);
        console.log(edgeHandlesOn);
        if (edgeHandlesOn)net.edgehandles.start();
    },

    // degree
    'click #remove-isolated-nodes' : function() {
        // var network = Template.instance().network.get().net;
        var isolated = network.elements("node[[degree = 0]]")
        network.remove(isolated);
    }



}




