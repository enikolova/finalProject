angular.module('advancedSearchController', ['advancedSearchService'])

    .controller('advancedSearchController', function ($scope, $http, $location,$rootScope,AdvancedSearch) {
      
        $scope.searchingForBooks = function (searchData) {
            
           
            AdvancedSearch.getBooks().then(function (data) {
                $scope.searchBooks = data.data;
                //search by Title
                if (searchData.title !== undefined && searchData.title !== '' && searchData.title !== null) {
                    $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                        if (book.volumeInfo.title !== undefined && book.volumeInfo.title !== '' || book.volumeInfo.title !== undefined) {
                            let title = searchData.title.trim().split('').join('').toUpperCase();
                            let bookTitle = book.volumeInfo.title.split(' ').join('').toUpperCase();
                            if(bookTitle.indexOf(title) !== -1) {
                            return book
                            }
                        }
                    })
                    

                }
                
                // search by Author
                if (searchData.author !== '' && searchData.author !== null && searchData.author !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                                    if(book.volumeInfo.authors !== undefined) {
                                        let author = searchData.author.trim().split('').join('').toUpperCase();
                                        let bookAuthor = book.volumeInfo.authors.join('').toUpperCase();
                                        if(bookAuthor.indexOf(author) !== -1) {
                                        return book;
                                    }
                                    
                                }
                            
                            
                        })
                }
                //search by ISBN-10
                if (searchData.isbn10 !== '' && searchData.isbn10 !== null && searchData.isbn10 !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                            if(book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[1]){
                              return book.volumeInfo.industryIdentifiers[1].identifier.indexOf(searchData.isbn10) !== -1;
                            }
                        
                          
                            
                        })
                        console.log($scope.searchBooks)
                }
                
                //search by ISBN-13
                if (searchData.isbn13 !== '' && searchData.isbn13 !== null && searchData.isbn13 !== undefined) {
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {                            
                            if(book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0]){
                                return book.volumeInfo.industryIdentifiers[0].identifier.indexOf(searchData.isbn13) !== -1;
                            }
                        
                          
                            
                        })
                        
                }
                
                //search by Publisher
                if (searchData.publisher !== '' && searchData.publisher !== null && searchData.publisher !== undefined) {
                    
                        $scope.searchBooks = $scope.searchBooks.filter(function (book) {
                
                            if(book.volumeInfo.publisher !== undefined) {
                                let publisher = searchData.publisher.trim().split('').join('').toUpperCase();
                                let bookPublisher = book.volumeInfo.publisher.split('').join('').toUpperCase();
                                if(bookPublisher.indexOf(publisher) !== -1) {
                                return book;
                                }
                                
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