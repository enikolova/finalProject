angular.module('mainController', [])
.controller('mainController',function($http, $scope) {
    $http.get('http://emazon.herokuapp.com/books/').then(function(docs) {   
    $scope.books = docs.data.filter(x => x.volumeInfo.averageRating == 5);
    
    
})
})