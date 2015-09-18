Template.comments.helpers({
    comments: function() {
        var comments = Comments.find({"id" : Session.get('currentId'),  "type" : Session.get('currentType')}).fetch();
        // console.log(comments);
        return comments;
    }
})
