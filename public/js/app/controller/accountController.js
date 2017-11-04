angular.module('accountController', []) 

.controller('accountController', function($scope, $http) {
    var id = sessionStorage.getItem('user')
    $http.get('http://localhost:4000/login/' + id).then(function(data) {
    console.log(data.data)    
    $scope.user = data.data
    })
})