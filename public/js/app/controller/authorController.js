angular.module('authorController', [])
    .controller('authorController', function ($http, $scope, $rootScope, $routeParams, $location) {
    
        var name = location.hash.split('/')[2];
        name = name.split('%20').join(' ');
        console.log(name);
        $http.get('http://localhost:4000/authors/' + name).then(function (author) {
            $scope.author = author.data;
            $http.get('http://localhost:4000/books/').then(function (books) {
                $scope.booksByAuthor = books.data.filter(function (b) {

                    if (b.volumeInfo.authors)
                        return b.volumeInfo.authors.some(s => s == name);
                })
            })
        })
        $scope.sortBooks = 'saleInfo.listPrice.amount';
    })
