angular.module('authorController', ['authorService'])
    .controller('authorController', function ($http, $scope, $rootScope, $routeParams, $location,Author) {
        $scope.loading = true;
        var name = location.hash.split('/')[2];
        name = name.split('%20').join(' ');
       Author.getAuthor(name).then(function (author) {
            $scope.author = author.data;
            Author.allBooks().then(function (books) {
                $scope.loading = false; 
            $scope.booksByAuthor = books.data.filter(function (b) {

                    if (b.volumeInfo.authors)
                        return b.volumeInfo.authors.some(s => s == name);
                })
                  
            })
        })
        $scope.sortBooks = 'saleInfo.listPrice.amount';

        $scope.currentPage = 1;
        $scope.startIndex = 0;
       
        $scope.nextPage = function() {
            $scope.currentPage += 1;
           $scope.startIndex += 5
          
            
        }
        $scope.prevPage = function() {
            $scope.currentPage -= 1;
            $scope.startIndex -= 5;
        }

    })
