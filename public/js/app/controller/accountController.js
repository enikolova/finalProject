angular.module('accountController', ['accountService'])

    .controller('accountController', function ($scope, $http, Account) {
        var id = sessionStorage.getItem('user')
        $scope.loading = true;
        Account.getBooks().then(function (books) {
            $scope.books = books.data;
            Account.getUser(id).then(function (data) {
                $scope.user = data.data
                $scope.user.comments.forEach(function (comment) {

                    comment.bookTitle = $scope.books.find(function (book) {

                        return book._id == comment.bookId
                    }).volumeInfo.title


                });

            })
            $scope.loading = false;
        })


        $scope.startIndex = 0;
        $scope.nextPage = function () {
            $scope.currentPage += 1;
            $scope.startIndex += 4;


        }
        $scope.prevPage = function () {
            $scope.currentPage -= 1;
            $scope.startIndex -= 4;
        }
    })