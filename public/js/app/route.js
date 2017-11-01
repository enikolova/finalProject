angular.module('appRoutes', ['ngRoute','authorController']).config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'view/home.htm',
        controller: 'mainController'
    })
    .when('/advanced', {
        templateUrl: 'view/advancedSearch.htm',
        
    })
    .when('/login', {
        templateUrl: 'view/login.htm',

    })
    .when('/book/:book_id', {
        templateUrl: 'view/book.htm',
        controller: 'bookController'
    })
    .when('/authors/:author_name',{
        templateUrl:'view/author.htm',
        controller:'authorController'
    })
    .otherwise({redirectTo : '/'})


})