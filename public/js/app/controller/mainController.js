angular.module('mainController', ['mainService'])
.controller('mainController',function($http, $scope, $location, Main) {
    $scope.loading = true;
    
     $scope.isAdmin=function(){
         if(sessionStorage.getItem("user")=='5a004097e3377843e8250f71'){
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
})