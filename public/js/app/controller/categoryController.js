angular.module('categoryController', [])
    .controller('categoryController', function ($http, $scope, $route, $rootScope, $routeParams, $location) {
        var category = location.hash.split("/")[2];
        category = category.split("%20").join(' ');
        $scope.category = category;
        $scope.loading = true;
        if ($scope.category == "Best Books of 2017") {
            $http.get('http://localhost:4000/books/').then(function (book) {
               
            $scope.books = book.data.filter(b =>{
                   if(b.volumeInfo.publishedDate)
                if(b.volumeInfo.publishedDate.indexOf('2017') != -1)
                return b;
               });

                $scope.authors = [];
                $scope.books.forEach(function (x) {

                    if ($scope.authors.findIndex(y => y.name == x.volumeInfo.authors[0]) == -1)
                        $scope.authors.push({ name: x.volumeInfo.authors[0] });

                });
                $scope.loading = false;
            });



        }
        else {
            $http.get('http://localhost:4000/books/category/' + category).then(function (book) {
                $scope.loading = false;
                $scope.books = book.data;

                $scope.authors = [];
                $scope.books.forEach(function (x) {

                    if ($scope.authors.findIndex(y => y.name == x.volumeInfo.authors[0]) == -1)
                        $scope.authors.push({ name: x.volumeInfo.authors[0] });

                });
            });
        }
  $scope.filterAuthors='';
        $scope.sortBooks = 'saleInfo.listPrice.amount'
        $scope.changeAuthor=function(name){
             $scope.filterAuthors=name;
        }
         $scope.rating=0;
        $scope.change=function(num){
             $scope.rating=num;
        }
        
       $scope.getBooks=function(rating){
            $scope.filBooks=$scope.books.filter(x=>x.volumeInfo.averageRating>=rating);
           return $scope.filBooks;
       }
      
    })