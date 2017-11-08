angular.module('loginController', ['loginService'])
    .controller('loginController', function ($http, $location, $scope, $timeout, Login) {

        $scope.doLogin = function (loginData) {

            $scope.errorMsg = false;

            Login.login(loginData).then(function (data) {
                if (data.data.success) {
                    $scope.successMsg = data.data.message
                    //redirect to home
                    $timeout(function () {
                        $location.path('#!/')
                    }, 2000)
                    sessionStorage.setItem('user', data.data.user)
                } else {
                    $scope.errorMsg = data.data.message
                }
            })
        }


    })