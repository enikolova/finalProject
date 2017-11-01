angular.module('bookController', [])
.controller('bookController' , function($http, $scope, $rootScope, $routeParams, $location) {
    
    
    $scope.findBook = function(id) {
        
       
        
        // var id = $routeParams.book_id
        $http.get('http://localhost:4000/books/' + id).then(function(docs) {
                $rootScope.bookId = docs.data
               return $rootScope.bookId
        })
        
    }
   
   
})