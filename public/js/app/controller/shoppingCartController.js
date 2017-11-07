angular.module('shoppingCartController', ['shoppingCartService'])
.controller('shoppingCartController',function($http, $scope,$location,ShoppingCart) {
    var userId=sessionStorage.getItem('user');
    $scope.loadCart=function(){
 ShoppingCart.loadCart(userId).then(function(data){
    
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
     $scope.book=book;
   ShoppingCart.remove(userId,{book: $scope.book}).then(function(){
        $scope.loadCart();
     })
 }
 $scope.clear=function(){
    ShoppingCart.clearCart(userId).then(function(){
         $location.path("successfulBuy")
     })
    
 }
})