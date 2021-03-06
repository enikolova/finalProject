angular.module('mainController', ['mainService'])
.controller('mainController',function($http, $scope, $location,$rootScope, Main) {
    $scope.loading = true;
    
     $scope.isAdmin=function(){
         if(sessionStorage.getItem("user")=='5a0b0a596c654110d45be09f'){
             return true;
         }else{
             return false;
         }
     }
    
    Main.getBooks().then(function(docs) {   
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
 $scope.logOut = function() {
     Main.logOut().then(function(data) {
         
         sessionStorage.clear()
         $location.path('#!/')

     })
 }
 $scope.searchByTitle=function(){
     console.log($scope.search.volumeInfo.title);
     $rootScope.allB=$scope.all.filter(x=>x.volumeInfo.title.toLowerCase().indexOf($scope.search.volumeInfo.title.toLowerCase())!==-1);
     console.log( $rootScope.allB);
     $scope.search.volumeInfo.title="";
     
 }
})