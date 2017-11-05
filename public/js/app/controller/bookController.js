angular.module('bookController', [])
.controller('bookController' , function($http, $scope,$route, $rootScope, $routeParams, $location) {
    var id = location.hash.split("/")[2];
    $http.get('http://localhost:4000/books/' + id).then(function(book) {
        $scope.book = book.data;
  
    //  $scope.newComment={};
    })
   $scope.getComments=function(){
$http.get('http://localhost:4000/comments/'+id).then(function(comment){
        $scope.comments=comment.data;
        console.log('hnfgbdfsdasaa');
    })
   } 
    
   $scope.getComments();
    $scope.addComment=function(){
        $http.put('http://localhost:4000/comments/'+id ,$scope.newComment).then(function(){
             $scope.getComments();
             $scope.rating={rating:$scope.newComment.rating};
             console.log( $scope.rating);
             $http.post('http://localhost:4000/books/'+id , $scope.rating).then(function(){
 $scope.newComment=null;
             })

           
            
        })
    }
  });
    