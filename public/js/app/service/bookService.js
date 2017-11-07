angular.module('bookService', [])

.factory('Book', function($http) {
    var bookFactory = [];

    bookFactory.getSingleBook = function(id) {
        return  $http.get('/books/' + id)
    }
    bookFactory.getComments = function(id) {
        return  $http.get('/comments/' + id)
    }
    bookFactory.putComment = function(id, newComment) {
        return $http.put('/comments/' + id, newComment)
    }
    bookFactory.changeRating = function(id, rating) {
        return $http.post('/books/' + id, rating)
    }
    bookFactory.deleteComment = function(id) {
        return  $http.delete('/comments/' + id)        
    }
    bookFactory.addToFav = function(userId, book) {
        return $http.post('/login/fav/' + userId, { book: book })
    }
    bookFactory.removeFromFav = function(userId, book) {
        return $http.post('/login/fav/remove/' + userId, { book: book })
    }
    bookFactory.getFav = function(id) {
        return $http.get('/login/fav/' + id)
    }
    bookFactory.addToCart = function(id, book) {
        return $http.post('/login/cart/'+id,{ book: book })       
    }
    bookFactory.getByName = function(name) {
        return $http.get('http://localhost:4000/books/book/' + name)
    }
   
    return bookFactory;
})