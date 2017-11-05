angular.module('accountController', []) 

.controller('accountController', function($scope, $http) {
    var id = sessionStorage.getItem('user')
    
    $http.get('http://localhost:4000/login/' + id).then(function(data) {
    $scope.user = data.data
    
    })
    $scope.startIndex = 0;
    $scope.nextPage = function() {
        $scope.currentPage += 1;
       $scope.startIndex += 4;
     
        
    }
    $scope.prevPage = function() {
        $scope.currentPage -= 1;
        $scope.startIndex -= 4;
    }
})