angular.module('authorController', [])
    .controller('authorController', function ($http, $scope, $rootScope, $routeParams, $location) {
        //     $scope.findAuthor=function(name){
        //         var name=name;
        //         console.log($location.hash())
        //     $http.get('http://localhost:4000/authors/' + name).then(function(docs) {
        //                 $rootScope.authors = docs.data
        //                return $rootScope.authors;
        //         })

        //     $http.get('http://localhost:4000/books/').then(function(docs){
        //         $rootScope.booksByAuthor=docs.data.filter(function(b){

        //            if(b.volumeInfo.authors)
        //             return b.volumeInfo.authors.some(s=>s==name);
        //         })
        //         return $rootScope.booksByAuthor;

        //     })
        // }
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
        $scope.sortBooks = 'saleInfo.listPrice.amount'

    })