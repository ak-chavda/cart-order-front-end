var cartApp = angular.module('OrderApp', []);

cartApp.controller('orderController', function ($scope, $http) {

	$scope.errorMsg = null;
	$scope.Userid = 'user1';
	$scope.API_URL = 'http://localhost:8888/api/order/';
	$scope.jwttoken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTU4NDYyNzU5MSwiaWF0IjoxNTg0NTkxNTkxfQ.FzqiqIo-3Jmn24VBsHeWtazRC3Shd3jj-90_M-q88ls";

	$http.defaults.headers.common['Authorization'] = $scope.jwttoken;

	$scope.cancelOrder = function (orderid) {
		$scope.errorMsg = null;
		$http.delete($scope.API_URL + orderid + '/' + $scope.Userid).success(function (jsonData) {
			setResponseData(jsonData);
			console.log("status 200 ok");
		}).error(function (response) {
			$scope.errorMsg = response.msg;
			// alert(response.msg);
			console.log(response);
		});
	}

	//  this fn calls when the ng-controller initiated 
	$scope.init = function () {
		$scope.errorMsg = null;
		//  Get data from server
		$http.get($scope.API_URL + $scope.Userid)
			.success(function (jsonData) {
				setResponseData(jsonData);
				console.log($scope.orderData);
			})
			.error(function (response) {
				$scope.errorMsg = response.msg;
				showError();
				console.log("Something is Wrong!");
			});
	};


	function showError() {
		var obj = document.getElementById("error-div");
	}

	// this will update the ng scope variables data
	var setResponseData = function (jsonData) {
		$scope.orderData = jsonData;
		$scope.listOfOrders = jsonData.listOfOrders;
	}

});

function showNextRow(id) {
	var x = document.getElementById("even" + id);
	if (x.style.display === "none") {
		x.style.display = "";
	} else {
		x.style.display = "none";
	}
}
