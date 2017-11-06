angular.module('adminController', [])
.controller('adminController',function($http, $scope) {
 $scope.allBooks=function(){
$http.get('http://localhost:4000/books/').then(function(docs) {  
        $scope.all=docs.data;
        $scope.booksLength=docs.data.length;
  });
 } 
  $scope.allBooks();
  $scope.deleteBook=function(bookId){
      $http.delete('http://localhost:4000/books/book/remove/'+bookId).then(function(){
        $scope.allBooks();
      })
  }
  $scope.allUser=function(){
      $http.get('http://localhost:4000/login/').then(function(docs) {  
        $scope.allUsers=docs.data;
        $scope.usersLength=docs.data.length;
  });
}
$scope.allUser();
$scope.deleteUser=function(userId){
    $http.delete('http://localhost:4000/login/remove/'+userId).then(function(docs) {  
        $scope.allUser();
})
}
})