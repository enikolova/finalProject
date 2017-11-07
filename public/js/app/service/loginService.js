angular.module('loginService', [])

.factory('Login', function($http) {
    var loginFactory = [];

    loginFactory.login = function(loginData) {
        return $http.post('/login',loginData);
    }
    return loginFactory;
})