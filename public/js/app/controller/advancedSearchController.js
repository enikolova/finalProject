angular.module('advancedSearchController', ['advancedSearchService'])

    .controller('advancedSearchController', function ($scope, $http, $location,$rootScope,AdvancedSearch) {
      
        $scope.searchingForBooks = function (searchData) {
            
           
            AdvancedSearch.getBooks().then(function (data) {
                $scope.searchBooks = data.data;
                // search by Title
                if (searchData.title !== undefined && searchData.title !== '' && searchData.title !== null) {
                    $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                        if (book.volumeInfo.title !== undefined && book.volumeInfo.title !== '' || book.volumeInfo.title !== undefined) {
                            return book.volumeInfo.title.toUpperCase() === searchData.title.toUpperCase()
                        }
                    })
                    

                }
                
                // search by Author
                if (searchData.author !== '' && searchData.author !== null && searchData.author !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                            if(book.volumeInfo.authors !== undefined) {
                                if (book.volumeInfo.authors.some(function (x) {
                                    return x.split('').join('').toUpperCase() == searchData.author.split('').join('').toUpperCase()
                                })) {
                                    return book;
                                }
                            }
                            
                        })
                }
                //search by ISBN-10
                if (searchData.isbn10 !== '' && searchData.isbn10 !== null && searchData.isbn10 !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                            if(book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[1]){
                              return book.volumeInfo.industryIdentifiers[1].identifier == searchData.isbn10;
                            }
                        
                          
                            
                        })
                        console.log($scope.searchBooks)
                }
                
                //search by ISBN-13
                if (searchData.isbn13 !== '' && searchData.isbn13 !== null && searchData.isbn13 !== undefined) {
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {                            
                            if(book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0]){
                              return book.volumeInfo.industryIdentifiers[0].identifier == searchData.isbn13;
                            }
                        
                          
                            
                        })
                        
                }
                
                //search by Publisher
                if (searchData.publisher !== '' && searchData.publisher !== null && searchData.publisher !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                            if(book.volumeInfo.publisher !== undefined) {
                                    return book.volumeInfo.publisher == searchData.publisher;
                                
                            }
                            
                        })
                }
                //search by Price
                if (searchData.price !== '' && searchData.price !== null && searchData.price !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                            if(book.saleInfo.listPrice !== undefined) {
                                    return book.saleInfo.listPrice.amount <= searchData.price;
                                
                            }
                            
                        })
                }
             
               
             
            $rootScope.allB=$scope.searchBooks
            
            })
            
            
        }
        $scope.startIndex = 0;
        $scope.currentPage = 1;
        $scope.nextPage = function() {
            $scope.currentPage += 1;
           $scope.startIndex += 5;
         
            
        }
        $scope.prevPage = function() {
            $scope.currentPage -= 1;
            $scope.startIndex -= 5;
        }
        
    })