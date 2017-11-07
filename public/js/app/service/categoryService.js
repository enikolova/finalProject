angular.module('categoryService', [])

.factory('Category', function($http) {
    var categoryFactory = [];

    categoryFactory.allBooksFromCategory= function(category) {
        return $http.get('/books/category/'+category);
    }
    return  categoryFactory;
})