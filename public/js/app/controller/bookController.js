angular.module('bookController', [])
    .controller('bookController', function ($http, $scope, $route, $rootScope, $routeParams, $location, $timeout) {
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
            });
        }
        $scope.getBook()
        $scope.getComments = function () {
            $http.get('http://localhost:4000/comments/' + id).then(function (comment) {
                $scope.comments = comment.data;
                $scope.getBook()
            })
        }

        $scope.getComments();
        $scope.addComment = function () {
            $http.put('http://localhost:4000/comments/' + id, $scope.newComment).then(function () {
                $scope.getComments();


                $scope.rating = { rating: $scope.newComment.rating };
                $http.post('http://localhost:4000/books/' + id, $scope.rating).then(function () {
                    $scope.newComment = null;
                })



            })
        }
        $scope.deleteComment = function (id) {
            $http.delete('http://localhost:4000/comments/' + id).then(function () {
                $scope.getComments();
            })
        }

        $scope.addToFavourite = function () {
            var userId = sessionStorage.getItem('user')

            $http.post('http://localhost:4000/login/fav/' + userId, { book: $scope.book }).then(function (data) {


                if (data.data.success) {

                    $scope.successMsg = data.data.message;
                    $timeout(function () {
                        $scope.successMsg = ''

                    }, 2000);
                    $scope.book.isFav = true;
                } else {


                    $scope.errorMsg = data.data.message;
                    $timeout(function () {
                        $scope.errorMsg = ''
                    }, 2000)
                }
                $scope.buttonIs()
            })
        }
        $scope.removeFromFavourite = function () {
            var userId = sessionStorage.getItem('user')

            $http.post('http://localhost:4000/login/fav/remove/' + userId, { book: $scope.book }).then(function (data) {

                if (data.data.success) {

                    $scope.successMsg = data.data.message;
                    $timeout(function () {
                        $scope.successMsg = ''

                    }, 2000);
                    $scope.book.isFav = false;
                } else {
                    $scope.errorMsg = data.data.message;
                    $timeout(function () {
                        $scope.errorMsg = '';

                    }, 2000)
                }

            })
        }


        var userId = sessionStorage.getItem('user');

            $timeout(function () {
                $http.get('http://localhost:4000/login/fav/' + userId).then(function (data) {

                    $scope.favBooks = data.data;
                    $scope.book.isFav = $scope.favBooks.some(x => x._id == id);
                }).then(function () {

                    $scope.hasInFav = function () {
                        return $scope.favBooks.some(x => x._id == id);
                    }
                    $scope.buttonIs = function () {
                        if ($scope.hasInFav() == false && $scope.userLogged() == true) {
                            return true;
                        }

                        if ($scope.hasInFav() == true && $scope.userLogged() == true) {
                            return false;
                        }
                    }
                });
            }, 0);

    });
