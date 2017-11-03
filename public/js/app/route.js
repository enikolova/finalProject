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
        controller: 'loginController'

    })
    .when('/signup',{
        templateUrl:'view/signup.htm',
        controller: 'registerController'
       
    })
    .when('/book/:book_id', {
        templateUrl: 'view/book.htm',
        controller: 'bookController'
    })
    .when('/authors/:author_name',{
        templateUrl:'view/author.htm',
        controller:'authorController'
    })
    .when('/myacc' , {
        templateUrl: 'view/myacc.htm',
        
    })
    .otherwise({redirectTo : '/'})


})