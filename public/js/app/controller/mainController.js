angular.module('mainController', [])
.controller('mainController',function($http, $scope) {
    $scope.loading = true;
    
     
    
    $http.get('http://localhost:4000/books/').then(function(docs) {   
    $scope.books = docs.data.filter(x => x.volumeInfo.averageRating == 5);
    $scope.loading = false; 
    $scope.all=docs.data;
   
});

    $scope.checkLogIn = function() {
    if(sessionStorage.getItem("user")) {
        return true
    } else {
        return false
    }
}
 
})