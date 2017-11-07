angular.module('accountService', [])

.factory('Account', function($http) {
    var accountFactory = [];

    accountFactory.getBooks = function() {
        return $http.get('/books/')
    }
    accountFactory.getUser = function(id) {
       return $http.get('/login/' + id)
    }
    return accountFactory;
})