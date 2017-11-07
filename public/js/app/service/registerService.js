angular.module('registerService', [])

.factory('Register', function($http) {
    var regFactory = [];

    regFactory.registrate = function(regData) {
        return $http.post('/registration', regData)
    }
    return regFactory;
})