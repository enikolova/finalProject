angular.module('registerController', [])

.controller('registerController', function($http, $location, $scope, $timeout) {
    
    $scope.register = function(regData) {
        
        $scope.errorMsg = false;
       
        $http.post('/registration', regData).then(function(data) {
     
           if(data.data.success) {
                $scope.successMsg = data.data.message
                //redirect to home
                $timeout(function() {
                    $location.path('#!/')
                }, 2000)
               
           } else {
                $scope.errorMsg = data.data.message
           }
        })
    }
    
})