angular.module('adminController', ['adminService'])
.controller('adminController',function($http, $scope,Admin) {
 $scope.allBooks=function(){
Admin.allBooks().then(function(docs) {  
        $scope.all=docs.data;
        $scope.booksLength=docs.data.length;
  });
 } 
  $scope.allBooks();
  $scope.deleteBook=function(bookId){
    
      Admin.deleteBook(bookId).then(function(){
          $scope.s.volumeInfo.title=''
        $scope.allBooks();
      })
  }
  $scope.allUser=function(){
     Admin.allUsers().then(function(docs) {  
        $scope.allUsers=docs.data;
        $scope.usersLength=docs.data.length;
  });
}
$scope.allUser();
$scope.deleteUser=function(userId){
   Admin.deleteUser(userId).then(function(docs) {  
        $scope.allUser();
        
})

}
})