angular.module('commentController', ['commentService'])
.controller('commentController',function($http, $scope,Coment) {
    $scope.newComment={}
    var id = location.hash.split("/")[2];
    console.log(id);
    $scope.addComment=function(){
       Coment.addComment(id,$scope.newComment).then(function(){
            $scope.newComment={}
        })
    }
})