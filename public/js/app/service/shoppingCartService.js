angular.module('shoppingCartService', [])

    .factory('ShoppingCart', function ($http) {
        var shoppingCartFactory = [];

        shoppingCartFactory.loadCart = function (id) {
            return $http.get('/login/show/cart/' + id);
        }
        shoppingCartFactory.remove = function (id, book) {
            return $http.post('/login/remove/' + id, book);
        }
        shoppingCartFactory.clearCart = function (id) {
            return $http.post('login/clearCart/' + id);
        }
        return shoppingCartFactory;
    })