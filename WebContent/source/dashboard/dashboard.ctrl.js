/**
 * 
 */
(function(){
	app.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['$uibModal', '$scope','$interval'];
	function dashboardController($uibModal, $scope, $interval){
		var dshbrdCtrl = this;
		dshbrdCtrl.selectedProject = "default";
		dshbrdCtrl.gridEnable = false;
		dshbrdCtrl.selectedProjectValue = selectedProjectValue;
		dshbrdCtrl.toggle = toggle;
		dshbrdCtrl.reset = reset;
		dshbrdCtrl.data = [];
		dshbrdCtrl.toggleView = "GridView";
		dshbrdCtrl.buttonToggle = true;
		dshbrdCtrl.pieChartEnable = false;
		dshbrdCtrl.projects = 
			[{
				"projectID": 1942905,
				"projectName": "DeployJavaProject",
				"userStories": [{
					"labelName": ["iteration 3"],
					"name": "Story 3",
					"status": "started",
					"testCases": ["No Test Cases for This User Story ID136649143"],
					"testCasesCount": 1,
					"userStoryID": 136649143,
					"userStoryType": "feature"
				}, {
					"labelName": ["iteration 3"],
					"name": "Story 1",
					"status": "started",
					"testCases": ["No Test Cases for This User Story ID136649139"],
					"testCasesCount": 1,
					"userStoryID": 136649139,
					"userStoryType": "bug"
				}, {
					"labelName": ["interation 2", "iteration 3"],
					"name": "thdDashBoardForGithub",
					"status": "unscheduled",
					"testCases": ["No Test Cases for This User Story ID136649129"],
					"testCasesCount": 0,
					"userStoryID": 136649129,
					"userStoryType": "feature"
				}, {
					"labelName": ["interation 2", "iteration 3"],
					"name": "thdDashBoard",
					"status": "unscheduled",
					"testCases": ["No Test Cases for This User Story ID136649125"],
					"testCasesCount": 0,
					"userStoryID": 136649125,
					"userStoryType": "feature"
				}]
			}, {
				"projectID": 1942895,
				"projectName": "CucumberProject",
				"userStories": [{
					"labelName": ["itergation 1"],
					"name": "dashBoardIntergation",
					"status": "finished",
					"testCases": ["No Test Cases for This User Story ID136648427"],
					"testCasesCount": 0,
					"userStoryID": 136648427,
					"userStoryType": "feature"
				}, {
					"labelName": ["itergation 1"],
					"name": "Validation",
					"status": "unscheduled",
					"testCases": ["No Test Cases for This User Story ID136648451"],
					"testCasesCount": 0,
					"userStoryID": 136648451,
					"userStoryType": "feature"
				}]
			}];
		
		/*dshbrdCtrl.projects = ['THD', 'Guitar Center', 'Belk'];*/
		//chart options
		dshbrdCtrl.labels = ["Automated", "Unautomated"];
		//dshbrdCtrl.data = [25,75];
		dshbrdCtrl.colors = [
		                 {
		                   backgroundColor: "#ff6600",
		                   pointBackgroundColor: "#ff6600",
		                   pointHoverBackgroundColor: "#ff6600",
		                 },{
		                   backgroundColor: "#ff9933",
		                   pointBackgroundColor: "#ff9933",
		                   pointHoverBackgroundColor: "#ff9933",
			             }
		               ];
		//grid options
		dshbrdCtrl.gridOptions = {
				onRegisterApi : function(gridApi){
					dshbrdCtrl.gridApi = gridApi;
					$interval(function(){
						dshbrdCtrl.gridApi.core.handleWindowResize();
						dshbrdCtrl.gridApi.grid.refresh();
					}, 500, 10);
				    },
			    columnDefs: [
			                 {field: "sno.",displayName:"S.No",width: '5%',
			                  cellTemplate: '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}</span>'
			                 },
			                 { field: 'name' , displayName: "UserStory Name", width: '15%'},
			                 { field: 'userStoryID' , displayName: "UserStory ID", width: '15%'},
			                 { field: 'status' , displayName: "UserStory Status", width: '15%'},
			                 { field: 'userStoryType' , displayName: "UserStory Type", width: '15%'},
			                 { field: 'labelName' , displayName: "Label", width: '15%'},
			                 { field: 'testCasesCount' , displayName: "testCasesCount", width: '10%'},
			                 { field: "Automation Status", width: '10%',
			                   cellTemplate:"<div ng-show='row.entity.testCasesCount !== 0' style='padding-left: 30%;'><img src='images/green.jpg' style='width:25px;height:25px;'></div><div ng-show='row.entity.testCasesCount === 0' style='padding-left: 30%;'><img src='images/red.jpg' style='width:25px;height:25px;'></div> </div>"
			                 }
			               ]
		};
			   
	    //hide & show
	    function selectedProjectValue(value){
	    	dshbrdCtrl.toggleView = "GridView";
	    	if(dshbrdCtrl.selectedProject == "default"){
	    		dshbrdCtrl.gridEnable = false;
	    		dshbrdCtrl.buttonToggle = true;
	    	}else{
	    		dshbrdCtrl.buttonToggle = false;
	    		toggle();
	    	}
	    }
	    
	    //toggle between grid and chart
	    function toggle(){
	    	dshbrdCtrl.data = [];
	    	var totalStoryCount=0;
	    	var unAutomatedCount =0;
	    	var finalUnAutomatedCount =0;
	    	var finalAutomatedCount = 0;
	    	var  average = 0;
	    	var label = "";
	    	if(dshbrdCtrl.toggleView === "GridView"){
	    		dshbrdCtrl.toggleView = "ChartView";
	    		dshbrdCtrl.gridEnable = true;
	    		dshbrdCtrl.pieChartEnable = false;
	    		var projects = dshbrdCtrl.projects;
	    		for(var j = 0;j<projects.length;j++){
	    			var projectName = projects[j].projectName;
	    			if(dshbrdCtrl.selectedProject === projectName){
	    					//rowIndex++;
	    					//projects[j].userStories["sno"] = rowIndex;
	    					dshbrdCtrl.gridOptions.data = projects[j].userStories;
	    			}
	    		}
	    		$interval(function(){
					dshbrdCtrl.gridApi.core.handleWindowResize();
					dshbrdCtrl.gridApi.grid.refresh();
				}, 500, 10);
	    		
	    	}else{
	    		dshbrdCtrl.toggleView = "GridView";
	    		dshbrdCtrl.pieChartEnable = true;
				console.log(dshbrdCtrl.data);
	    		dshbrdCtrl.gridEnable = false;
	    		var projects = dshbrdCtrl.projects;
	    		for(var j = 0;j<projects.length;j++){
	    			var projectName = projects[j].projectName;
	    			if(dshbrdCtrl.selectedProject === projectName){
	    					for(var i=0; i<projects[j].userStories.length;i++){
	    						totalStoryCount =  projects[j].userStories.length;
	    						if(projects[j].userStories[i].testCasesCount === 0){
	    							unAutomatedCount++;
	    						}
	    					}
	    			}
	    		}
	    		average = unAutomatedCount / totalStoryCount;
				finalUnAutomatedCount = average * 100; 
				finalAutomatedCount = 100-finalUnAutomatedCount;
				
				dshbrdCtrl.data.push(finalAutomatedCount);
	    		dshbrdCtrl.data.push(finalUnAutomatedCount);
	    		console.log(dshbrdCtrl.data);
	    	}
	    }
	    // reset 
	    function reset(){
	    	dshbrdCtrl.selectedProject = "default";
	    }
}
})();