angular.module('searchedBook', ['bookService'])
    .controller('searchedBook', function ($http, $scope, $route, $rootScope, $routeParams, $location, $timeout, Book) {
        $scope.loading = true;
        var name = location.hash.split('/')[2];
        name = name.split('%20').join(' ');
         $scope.userLogged = function () {
            if (sessionStorage.getItem('user')) {

                return true;
            }
            return false;
        }
        Book.getByName(name).then(function (book) {
            $scope.book = book.data;
            var id = book.data._id;

            $scope.getComments = function () {
                Book.getComments(id).then(function (comment) {
                    $scope.comments = comment.data;
                })
            }
    
            $scope.getComments();
            $scope.addComment = function () {
                Book.putComment(id,$scope.newComment).then(function () {
                    $scope.getComments();
                    $scope.rating = { rating: $scope.newComment.rating };
                    console.log($scope.rating);
                    Book.changeRating(id,$scope.rating).then(function () {
                        $scope.newComment = null;
                    })



                })
            }

       
          $scope.deleteComment = function (id) {
            Book.delete(id).then(function () {
                $scope.getComments();
            })
        }

        $scope.addToFavourite = function () {
            var userId = sessionStorage.getItem('user')

            Book.addToFav(userId, $scope.book).then(function (data) {


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

            Book.removeFromFav(userId, $scope.book).then(function (data) {

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
                Book.getFav(userId).then(function (data) {

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
               Book.addToCart(userId,$scope.book).then(function(data){
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