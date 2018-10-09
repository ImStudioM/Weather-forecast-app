// Mobule
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


//rouots
weatherApp.config(function($routeProvider){
	
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.htm',
		controller:  'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.htm',
		controller:  'forecastController'
	})
});


//Srvicee

weatherApp.service('myCity', function(){
	this.city = 'new york';	
});

//Controler
weatherApp.controller('homeController', ['$scope', '$location', '$resource', 'myCity', function( $scope, $location, $resource, myCity ){
	
	$scope.city = myCity.city;
	$scope.$watch('city', function(){
		myCity.city = $scope.city;
	})
	
	
	$scope.submit = function (){

		$location.path('/forecast');

		$scope.weatherAPPID = "082e7595d9334336ee7595a79a7c50b5";
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get:{method: "JSONP"}});
        $scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city ,cnt:5,  appid: $scope.weatherAPPID });
	};
	
	
	


	
	//console.log($scope.weatherResult);
	
	//convert To c
	$scope.ktd = function(k){
		return Math.round(k - 273.15)
	};
	
	//convertToDate
	$scope.ctd = function(dt) { 
        return new Date(dt * 1000)
    };

}]);



weatherApp.controller('forecastController', ['$scope', function( $scope ){
	
}]);

// http://api.openweathermap.org/data/2.5/forecast/daily?q=hifa&cnt=2&APPID=082e7595d9334336ee7595a79a7c50b5

