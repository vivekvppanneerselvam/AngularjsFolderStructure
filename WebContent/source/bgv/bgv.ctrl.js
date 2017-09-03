/**
 * 
 */
(function(){
	app.controller('bgvController', bgvController);
	bgvController.$inject = ['$routeParams', '$location', 'commonService'];
	function bgvController($routeParams, $location, commonService){
		alert($routeParams.taskId);
		var bgvCtrl =this;
		
		bgvCtrl.submitRequest = submitBGVTask;
		bgvCtrl.cancelRequest = cancel;
		bgvCtrl.taskId = $routeParams.taskId;
		getRequestInformation();
		
		function getRequestInformation() {
			commonService.get('/getVariablesByTaskId?taskId=' + bgvCtrl.taskId).then(function(response) {
				if (response.status === 200) {
					console.log("Retrieved Request Information: " + response.data);
					bgvCtrl.requestInformation = response.data;
				} else {
					alert("Error while retrieving the request information.");
				}
			})
		}
		
		function submitBGVTask() {
			var formData={
					taskId : bgvCtrl.taskId,
					requestInformation : bgvCtrl.requestInformation
			}
			commonService.post('/submitBGVTask',formData).then(function(response){
				if(response.status === 200){
					alert("Background Verification Completed.");
					$location.path('/tasks');
				}else{
					alert("Error while submitting the task");
				}
			})
		}
		
		function cancel(){
			$location.path('/tasks');
		}
		
		function initiate(){
			bgvCtrl.rsnNtTermcand = 0;
			bgvCtrl.drugExpDate = 0;
			bgvCtrl.hireType = 0;
		}
		
	}
})();