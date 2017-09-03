/**
 * 
 */
(function(){
	app.controller('tasksController', tasksController);
	tasksController.$inject = ['$location', 'commonService', 'userProfileFactory', 'utilFactory'];
	function tasksController($location, commonService, userProfileFactory, utilFactory){
		var taskCtrl = this;
		taskCtrl.myTasks=[];
		taskCtrl.teamTasks = [];
		
		taskCtrl.claimTask = claimTask;
		taskCtrl.openTask = openTask;
		
		taskCtrl.userId = userProfileFactory.getUserName();
		taskCtrl.userRoles = userProfileFactory.getUserRoles();
		
		getTasksByUserID();
		getTasksByUserRole();
		
		function claimTask(){
			commonService.get('/claimTask?taskId='+taskCtrl.selectedTeamTask+'&loggedInUserId='+taskCtrl.userId).then(function(response){
				if (response.data.statusCode === 0) {
					utilFactory.success(response.data.statusDesc);
					getTasksByUserID();
					getTasksByUserRole();
				}else if(response.data.statusCode === 2){
					utilFactory.error(response.data.statusDesc);
				}
			}, function(response){
				taskCtrl.myTasks = [];
				utilFactory.error("Error");
			});
		}
		
		function openTask(){
			if(taskCtrl.selectedMyTask){
				$location.path('/BGV/' + taskCtrl.selectedMyTask);
			}else{
				utilFactory.info("Select a task to Open.");
			}
		}
		
		function getTasksByUserID(){
			commonService.get('/getAllTasksByUserID?userId='+taskCtrl.userId).then(function(response){
				if (response.data.statusCode === 0) {
					taskCtrl.myTasks = response.data.responseDataList;
				}else if(response.data.statusCode === 1){
					taskCtrl.myTasks = [];
					utilFactory.info(response.data.statusDesc);
				}else if(response.data.statusCode === 2){
					taskCtrl.myTasks = [];
					utilFactory.error(response.data.statusDesc);
				}
			}, function(response){
				taskCtrl.myTasks = [];
				utilFactory.error("Error");
			});
		}
		
		function getTasksByUserRole(){
			commonService.get('/getAllTasksByUserRole?userRoles='+taskCtrl.userRoles).then(function(response){
				if (response.data.statusCode === 0) {
					taskCtrl.teamTasks = response.data.responseDataList;
				}else if(response.data.statusCode === 1){
					taskCtrl.teamTasks = [];
					utilFactory.info(response.data.statusDesc);
				}else if(response.data.statusCode === 2){
					taskCtrl.teamTasks = [];
					utilFactory.error(response.data.statusDesc);
				}
			}, function(response){
				taskCtrl.teamTasks = [];
				utilFactory.error("Error");
			});
		}
		
		
	}
})();