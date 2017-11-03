angular.module('bookController', [])
.controller('bookController' , function($http, $scope,$route, $rootScope, $routeParams, $location) {
    var id = location.hash.split("/")[2];
    $http.get('http://localhost:4000/books/' + id).then(function(book) {
        $scope.book = book.data;
    });

    
})