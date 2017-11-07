angular.module('mainService', [])

.factory('Main', function($http) {
    var mainFactory = [];

    mainFactory.getBooks = function() {
        return $http.get('/books/')
    }
    mainFactory.logOut = function() {
        return $http.post('/login/profile/logout')
    }
    return mainFactory;
})