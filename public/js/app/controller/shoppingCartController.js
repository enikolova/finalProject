angular.module('shoppingCartController', [])
.controller('shoppingCartController',function($http, $scope) {
    var userId=sessionStorage.getItem('user');
    $scope.loadCart=function(){
 $http.get('http://localhost:4000/login/show/cart/'+userId).then(function(data){
     console.log(data);
     $scope.cart=data.data;
      $scope.cart.forEach(function(book) {
           book.count =1;
     });
 })
}
$scope.loadCart()
 $scope.getTotal = function() {
     var total = 0;
     if ($scope.cart)
        $scope.cart.forEach(function(book) {
                total += book.count * book.saleInfo.listPrice.amount;
        });
     return total.toFixed(2);
 }
 $scope.removeFromCart=function(book){
     $scope.bookk=book;
     console.log($scope.bookk);
     $http.post('http://localhost:4000/login/remove/'+userId ,{book : $scope.bookk}).then(function(){
        $scope.loadCart();
     })
 }
})