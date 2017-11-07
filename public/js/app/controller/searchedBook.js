angular.module('searchedBook', [])
    .controller('searchedBook', function ($http, $scope, $route, $rootScope, $routeParams, $location, $timeout) {
        $scope.loading = true;
        var name = location.hash.split('/')[2];
        name = name.split('%20').join(' ');
         $scope.userLogged = function () {
            if (sessionStorage.getItem('user')) {

                return true;
            }
            return false;
        }
        $http.get('http://localhost:4000/books/book/' + name).then(function (book) {
            $scope.book = book.data;
            var id = book.data._id;

            $scope.getComments = function () {
                $http.get('http://localhost:4000/comments/' + id).then(function (comment) {
                    $scope.comments = comment.data;
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

        $scope.addInCart=function(){
               var userId = sessionStorage.getItem('user')
            $http.post('http://localhost:4000/login/cart/'+userId,{ book: $scope.book }).then(function(data){
                 if (data.data.success) {

                    $scope.successMsg = data.data.message;
                    $timeout(function () {
                        $scope.successMsg = ''
                    }, 2000)
                } else {
                    $scope.errorMsg = data.data.message;
                    $timeout(function () {
                        $scope.errorMsg = ''
                    }, 2000)
                }
            })
          
        }
    })
     })