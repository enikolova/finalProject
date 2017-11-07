angular.module('appRoutes', ['ngRoute','authorController']).config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'view/home.htm',
        controller: 'mainController'
    })
    .when('/advanced', {
        templateUrl: 'view/advancedSearch.htm',
        controller: 'advancedSearchController'
        
    })
     .when('/shoppingCart', {
        templateUrl: 'view/shoppingCart.htm',
        controller: 'shoppingCartController'
        
    })
    .when('/advancedResult', {
        templateUrl: 'view/searchResult.htm',
        controller: 'advancedSearchController'
        
    })
    .when('/successfulBuy', {
        templateUrl: 'view/successfulBuy.htm'
        
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
    .when('/books/:book_name', {
        templateUrl: 'view/book.htm',
        controller: 'searchedBook'
    })
    .when('/authors/:author_name',{
        templateUrl:'view/author.htm',
        controller:'authorController'
    })
    .when('/myacc' , {
        templateUrl: 'view/myacc.htm',
        controller: 'accountController'
    })
    .when('/admin' , {
        templateUrl: 'view/admin.htm',
        controller: 'adminController'
    })
    .when('/category/:category_name',{
        templateUrl:'view/booksByCategory.htm',
        controller:'categoryController'
    })
    .otherwise({redirectTo : '/'})


})