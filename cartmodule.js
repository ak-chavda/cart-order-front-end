 var cartApp = angular.module('CartApp', []);
  cartApp.controller('cartController', ['$scope', '$http', function ($scope, $http) {

  
    //----------------------API calls------------------------------

    $scope.Userid = 'user1';
    $scope.API_URL = 'http://localhost:8888/api/cart/';
    // $scope.CART_ID = '5e6f3edfaf0fb57fd4a33a4a';
    $scope.jwttoken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTU4NDYzMTQ2OSwiaWF0IjoxNTg0NTk1NDY5fQ.pOs3TKqrs7ybYj3d5m5d8n26VMuwTCeuypg0GDRgXTk';

    $http.defaults.headers.common['Authorization'] = $scope.jwttoken;



//this api calls when the ng-controller initiated 
    $http.get($scope.API_URL + 'user1')
      .success(function (jsonData) {
        setResponseData(jsonData);
        console.log($scope.cartData);
      })
      .error(function (response) {
        $scope.errorMsg = response.msg;
        alert(response.msg);
        console.log("Something Wrong!");
      });

   
	// update cart information
    $scope.refreshCart = function () {
      $http.get($scope.API_URL + 'user1')
	  .success(function (jsonData) {
        setResponseData(jsonData);
        console.log("Post Data Submitted Successfully!");
      }).error(function (response) {
        $scope.errorMsg = response.msg;
        alert(response.msg);
        console.log("Something Wrong!");
      });
    }
	
   

	// update cart information
    $scope.updateCart = function () {
      $http.post($scope.API_URL + $scope.Userid, JSON.stringify($scope.cartData))
	  .success(function (jsonData) {
        setResponseData(jsonData);
        console.log("Post Data Submitted Successfully!");
      }).error(function (response) {
        $scope.errorMsg = response.msg;
        alert(response.msg);
        console.log("Something Wrong!");
      });
    }
	

	// delete item form cart
	$scope.removeItem = function (itemid) {
		console.log($scope.cartData);
		$http.delete($scope.API_URL + $scope.Userid + '/' + itemid)
		.success(function (jsonData) {
			setResponseData(jsonData);
			console.log("item deleted Successfully!");
		}).error(function (response) {
			$scope.errorMsg = response.msg;
			alert(response.msg);
			console.log("Something Wrong!");
		});
	}

 // this will update the ng scope variables data
    var setResponseData = function (jsonData) {
      $scope.cartData = jsonData;
      $scope.cartItems = jsonData.items;
	  $scope.isCartEmpty = ($scope.cartItems.length <= 0) ? true : false;
    }


  $scope.changeQty = function (item) {
	  //	update qty value.
      item.qty = $("#qty" + item.itemid).val();
      console.log($scope.cartData);
    }

  }]);