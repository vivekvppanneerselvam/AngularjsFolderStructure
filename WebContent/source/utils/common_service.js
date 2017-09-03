/**
 * 
 */
(function(){
	app.service('commonService', commonService);
	commonService.$inject = ['$http'];
	function commonService($http){
		
		this.get = get;
		this.post = post;
		
		function get(url){
			return $http({
				method: 'GET',
				url: url
			});
		}
		
		function post(url, data){
			return $http({
				method: 'POST', 
				url: url,
				data : data
			});
		}
	}
})();