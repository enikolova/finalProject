angular.module('commentService', [])

.factory('Coment', function($http) {
    var commentFactory = [];

    commentFactory.addComment = function(id,newComment) {
        return $http.put('/comments/'+id, newComment);
    }
    return commentFactory;
})