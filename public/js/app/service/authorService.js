angular.module('authorService', [])

.factory('Author', function($http) {
    var authorFactory = [];

    authorFactory.getAuthor = function(name) {
        return $http.get('/authors/'+name);
    }
    authorFactory.allBooks=function(){
        return $http.get('/books');
    }

    return authorFactory;
})