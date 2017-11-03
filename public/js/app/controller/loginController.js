angular.module('loginController', [])

.controller('loginController', function($http, $location, $scope, $timeout) {
    
    $scope.doLogin = function(loginData) {
        
        $scope.errorMsg = false;
       
        $http.post('/login', loginData).then(function(data) {
            console.log(data)
           if(data.data.success) {
                $scope.successMsg = data.data.message
                //redirect to home
                $timeout(function() {
                    $location.path('#!/')
                }, 2000)
               sessionStorage.setItem('user', data.data.user) 
           } else {
                $scope.errorMsg = data.data.message
           }
        })
    }
    
})