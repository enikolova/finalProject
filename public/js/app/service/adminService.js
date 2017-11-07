angular.module('adminService', [])

.factory('Admin', function($http) {
    var adminFactory = [];

    adminFactory.allBooks = function() {
        return $http.get('/books/');
    }
    adminFactory.deleteBook=function(bookId){
        return $http.delete('/books/book/remove/'+bookId);
    }
    adminFactory.allUsers=function(){
        return $http.get('/login');
    }
    adminFactory.deleteUser=function(userId){
        return  $http.delete('/login/remove/'+userId);
    }
    return adminFactory;
})