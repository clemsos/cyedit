Template.addNetwork.events({
    'submit form': function(event){
      event.preventDefault();
      var networkName = $('[name=networkName]').val();
      Meteor.call("createNetwork",networkName);
      $('[name=networkName]').val('');
    }
});


Template.contextual.events= {
    'click #closeInfoBox' : function(event){
        $("#infoBox").css('visibility', 'hidden');
    }
};

