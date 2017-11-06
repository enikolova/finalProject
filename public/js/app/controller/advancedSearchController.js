angular.module('advancedSearchController', [])

    .controller('advancedSearchController', function ($scope, $http) {
        $scope.searchingForBooks = function (searchData) {
            // console.log(searchData)
            // $http.post('http://localhost:4000/advancedSearch/', searchData).then(function(data) {
            //     console.log(data)

            // }) 
            $http.get('http://localhost:4000/books/').then(function (data) {
                $scope.searchBooks = data.data;
                // search by Title
                if (searchData.title !== undefined && searchData.title !== '' && searchData.title !== null) {
                    $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                        if (book.volumeInfo.title !== undefined && book.volumeInfo.title !== '' || book.volumeInfo.title !== undefined) {
                            return book.volumeInfo.title.toUpperCase() === searchData.title.toUpperCase()
                        }
                    })
                    console.log($scope.searchBooks)

                }
                console.log(searchData.author)
                // search by Author
                if (searchData.author !== '' || searchData.author !== null || searchData.author !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                            if(book.volumeInfo.authors) {
                                if (book.volumeInfo.authors.some(function (x) {
                                    return x.toUpperCase() == searchData.author.toUpperCase()
                                })) {
                                    return book;
                                }
                            }
                            
                        })
                        console.log($scope.searchBooks)
                    

                }
                

            })
        }


    })