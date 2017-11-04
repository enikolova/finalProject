angular.module('commentController', [])
.controller('commentController',function($http, $scope) {
    $scope.newComment={}
    var id = location.hash.split("/")[2];
    console.log(id);
    $scope.addComment=function(){
        $http.put('http://localhost:4000/comments/'+id,newComment).then(function(){
            $scope.newComment={}
        })
    }
})