angular.module('searchedBook', [])
.controller('searchedBook',function($http, $scope) {
     $scope.loading = true;
        var name = location.hash.split('/')[2];
        name = name.split('%20').join(' ');
    $http.get('http://localhost:4000/books/book/'+name).then(function(book){
         $scope.book = book.data;
        var id=book.data._id;
           $scope.getComments=function(){
$http.get('http://localhost:4000/comments/'+id).then(function(comment){
        $scope.comments=comment.data;
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

    })
})