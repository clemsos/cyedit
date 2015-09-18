Template.addNetwork.events({
    'submit form': function(event){
      event.preventDefault();
      var networkName = $('[name=networkName]').val();
      Meteor.call("createNetwork",networkName);
      $('[name=networkName]').val('');
    }
});

Template.networks.events({
    'click .remove': function(event){
        event.preventDefault();
        Meteor.call("removeNetwork", (this._id));
    }
});

Template.contextual.events= {
    'click #closeInfoBox' : function(event){
        $("#infoBox").css('visibility', 'hidden');
    }
};

