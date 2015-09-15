Template.comments.helpers({
    comments: function() {
        return Comments.find({"id" : Session.get('currentId'),  "type" : Session.get('currentType')}).fetch();
    }
})
