angular.module('advancedSearchService', [])

.factory('AdvancedSearch', function($http) {
    var advFactory = [];

    advFactory.getBooks = function() {
        return $http.get('/books/')
    }
    return advFactory;
})