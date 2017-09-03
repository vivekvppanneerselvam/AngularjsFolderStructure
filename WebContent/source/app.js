/**
 * 
 */
var app;
(function(){
	app = angular.module('sqdashboard', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'datePicker', 'blockUI', 'ui.grid', 'chart.js']);
	/*function getSSO(){
		return $cookies.get('THDSSO');
	};*/
	function loadUserProfile($q, $cookies, commonService, userProfileFactory){
		return $q(function(resolve, reject) {
			commonService.get('/getUserDetails?sso='+$cookies.get('THDSSO')).then(function(response){
				if(response.data.errorMessage){
					alert(response.data.errorMessage);
					reject(response.data.errorMessage);
				}else{
					var auth = response.data.groups;
					var userRoles = [];
					for(var role in auth){
						userRoles.push(auth[role].authority);
					}
					userProfileFactory.setFirstName(response.data.firstName);
					userProfileFactory.setLastName(response.data.lastName);
					userProfileFactory.setUserName(response.data.userId);
					userProfileFactory.setUserRoles(userRoles);
					resolve(true);
				}
			}, function(response){
				reject('error');
			});
		  });
	}
	
	app.config(['$routeProvider',function ($routeProvider) {
	    $routeProvider.when('/dashboard', {
	            templateUrl: 'source/dashboard/dashboard.tmplt.html',
	            controller: 'dashboardController as dshbrdCtrl'
	    	}).otherwise({
	            redirectTo: '/dashboard'
	        });
	}]);
	
	app.config(['blockUIConfig',function (blockUIConfig) {
	    blockUIConfig.template = '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div ng-class=\"$_blockUiMessageClass\"><img src="images/loading_orange.gif"/></div></div>';
	    blockUIConfig.requestFilter = function (config) {
	      
	    };
	}]);

	/*app.run(['$window', '$location',function($window, $location){
		$window.onload = function(e) {
			$location.path('#/');
		};
	}]);*/
	
	app.controller('appCtrl', appCtrl);
	appCtrl.$inject = ['$scope', '$interval', 'userProfileFactory'];
	function appCtrl($scope, $interval, userProfileFactory){
		$interval(function(){
			$scope.userName = userProfileFactory.getFirstName() + ' ' + userProfileFactory.getLastName();
		}, 2000, 10);
	}
})();