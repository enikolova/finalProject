angular.module('loginController', [])
.controller('loginController', function($http, $location, $scope, $timeout) {
    
    $scope.doLogin = function(loginData) {
        
        $scope.errorMsg = false;
       
        $http.post('/login', loginData).then(function(data) {
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
    // $scope.doFacebookLogin = function() {
  
        
    //     $scope.errorMsg = false;
       
    //     $http.get('/oath/facebook').then(function(data) {
    //         if(err) {
    //             console.log(err)
    //         }
    //         console.log(data)
        //    if(data.data.success) {
        //         $scope.successMsg = data.data.message
        //         //redirect to home
        //         $timeout(function() {
        //             $location.path('#!/')
        //         }, 2000)
        //        sessionStorage.setItem('user', data.data.user) 
        //    } else {
        //         $scope.errorMsg = data.data.message
        //    }
    //     })
    // }

    
})