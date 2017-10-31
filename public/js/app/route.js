angular.module('appRoutes', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view/home.htm',
        controller: 'mainController'
    })
    .when('/advanced', {
        templateUrl: 'view/advancedSearch.htm',
        
    })
    .when('/register', {
        templateUrl: 'view/register.htm',

    })
    .otherwise({redirectTo : '/'})

   
})