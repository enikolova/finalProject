angular.module('accountController', [])

    .controller('accountController', function ($scope, $http) {
        var id = sessionStorage.getItem('user')
        $scope.loading = true;
        $http.get('http://localhost:4000/books/').then(function (books) {
            $scope.books = books.data;
            $http.get('http://localhost:4000/login/' + id).then(function (data) {
                $scope.user = data.data


                console.log($scope.books)
                $scope.user.comments.forEach(function (comment) {

                    comment.bookTitle = $scope.books.find(function (book) {
                        
                        return book._id == comment.bookId
                    }).volumeInfo.title
                    console.log(comment.bookTitle)
                    
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