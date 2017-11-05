angular.module('bookController', [])
    .controller('bookController', function ($http, $scope, $route, $rootScope, $routeParams, $location) {
        var id = location.hash.split("/")[2];
        $scope.userLogged = function () {
            if (sessionStorage.getItem('user')) {
                return true;
            }
            return false;
        }
        $scope.book = null;
        $scope.getBook = function () {
            $http.get('http://localhost:4000/books/' + id).then(function (book) {
                $scope.book = book.data;
                $scope.bookRating = book.data.volumeInfo.averageRating
                
                //  $scope.newComment={};
            })
        }
        $scope.getBook()
        $scope.getComments = function () {
            $http.get('http://localhost:4000/comments/' + id).then(function (comment) {
                $scope.comments = comment.data;
                console.log('hnfgbdfsdasaa');
                $scope.getBook()
            })
        }

        $scope.getComments();
        $scope.addComment = function () {
            $http.put('http://localhost:4000/comments/' + id, $scope.newComment).then(function () {
                $scope.getComments();
           
                
                $scope.rating = { rating: $scope.newComment.rating };
                console.log($scope.rating);
                $http.post('http://localhost:4000/books/' + id, $scope.rating).then(function () {
                    $scope.newComment = null;
                })



            })
        }
        $scope.addToFavourite = function() {
            var userId = sessionStorage.getItem('user')
            console.log(userId)
            // $scope.book =  {book: $scope.getBook()};
            console.log($scope.book)
            $http.post('http://localhost:4000/login/fav/' + userId, {book:$scope.book}).then(function(data) {
                console.log(data)
            })
        }
    });
