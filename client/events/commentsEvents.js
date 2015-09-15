Template.commentForm.events = {
    'click #submit': function(e){

        e.preventDefault();

        var body = $('#body').val();
        console.log(body);
        // save in DB
        if(body !="")  {
            Meteor.call("addComment", Session.get('currentId'), Session.get('currentType'), body);
            // reset textarea display
            $('#body').val('');
        }
    }

}
