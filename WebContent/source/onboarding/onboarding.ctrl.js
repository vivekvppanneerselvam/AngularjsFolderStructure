/**
 * 
 */
(function(){
	app.controller('onBoardingController', onBoardingController);
	onBoardingController.$inject = ['$scope', '$location', '$filter', 'commonService', 'utilFactory'];
	function onBoardingController($scope, $location, $filter, commonService, utilFactory){
		var onBrdngCtrl = this;
		
		onBrdngCtrl.dateFormat = 'MM/DD/YYYY';
		
		onBrdngCtrl.submitRequest = submitRequest;
		onBrdngCtrl.cancelRequest = cancelRequest;
		
		reset();
		
		function submitRequest(){
			submitValidation();
			if(!onBrdngCtrl.firstNmErr && !onBrdngCtrl.lastNmErr && !onBrdngCtrl.joinDtErr && 
					!onBrdngCtrl.verbOffDtErr && !onBrdngCtrl.hirePosTitleErr && !onBrdngCtrl.candidateBrnchErr && 
					!onBrdngCtrl.traindeviceCordErr && !onBrdngCtrl.hireManagerErr && !onBrdngCtrl.businessGrpErr){
				var candidateInfo ={
						firstName: onBrdngCtrl.firstNm,
						middleName: onBrdngCtrl.middleNm,
						lastName: onBrdngCtrl.lastNm ,
						joiningDate: onBrdngCtrl.joinDt ,
						verbalOfferDate: onBrdngCtrl.verbOffDt
						
				};
				var formData={
						
						newHirePositionTitle : onBrdngCtrl.hirePosTitle,
						branchName : onBrdngCtrl.candidateBrnch, 
						I9TrainingDeviceCoordinator : onBrdngCtrl.traindeviceCord,
						hiringManager: onBrdngCtrl.hireManager,
						businessGroup: onBrdngCtrl.businessGrp,
						candidateInformationDTO : candidateInfo
				};
				commonService.post('/newRequest', formData).then(function(response){
					if(response.status === 200){
						utilFactory.success("Onboarding Request raised successfully");
						$location.path('/tasks');
					}else{
						utilFactory.error("error while saving the record");
					}
				}, function(response){
					utilFactory.error("Web page error");
				});
			}
		}
		
		function cancelRequest(){
			reset();
		}
		
		function reset(){
			onBrdngCtrl.candidateBrnch = "0";
			onBrdngCtrl.businessGrp="0";
			onBrdngCtrl.hireManager="0";
			onBrdngCtrl.hirePosTitle="0";
			onBrdngCtrl.traindeviceCord="0";
			onBrdngCtrl.firstNm="";
			onBrdngCtrl.middleNm=""; 
			onBrdngCtrl.verbOffDt=null; 
			onBrdngCtrl.lastNm="";
			onBrdngCtrl.joinDt=null;
			
		}
		
		function submitValidation(){
			if(!onBrdngCtrl.firstNm){
				onBrdngCtrl.firstNmErr = true;
			}else{
				onBrdngCtrl.firstNmErr = false;
			}
			if(!onBrdngCtrl.lastNm){
				onBrdngCtrl.lastNmErr = true;
			}else{
				onBrdngCtrl.lastNmErr = false;
			}
			if($scope.joiningDateForm.joiningDate.$invalid){
				onBrdngCtrl.joinDtErr = true;
			}else{
				onBrdngCtrl.joinDtErr = false;
				onBrdngCtrl.joinDt = $filter('date')(onBrdngCtrl.joinDt, 'MM/dd/yyyy');
			}
			if($scope.verbalOfficerDateForm.verbalOfficerDate.$invalid){
				onBrdngCtrl.verbOffDtErr = true;
			}else{
				onBrdngCtrl.verbOffDtErr = false;
				onBrdngCtrl.verbOffDt = $filter('date')(onBrdngCtrl.verbOffDt, 'MM/dd/yyyy');
				
			}
			if(onBrdngCtrl.hirePosTitle === '0'){
				onBrdngCtrl.hirePosTitleErr = true;
			}else{
				onBrdngCtrl.hirePosTitleErr = false;
			}
			if(onBrdngCtrl.candidateBrnch === '0'){
				onBrdngCtrl.candidateBrnchErr = true;
			}else{
				onBrdngCtrl.candidateBrnchErr = false;
			}
			if(onBrdngCtrl.traindeviceCord === '0'){
				onBrdngCtrl.traindeviceCordErr = true;
			}else{
				onBrdngCtrl.traindeviceCordErr = false;
			}
			if(onBrdngCtrl.hireManager === '0'){
				onBrdngCtrl.hireManagerErr = true;
			}else{
				onBrdngCtrl.hireManagerErr = false;
			}
			if(onBrdngCtrl.businessGrp === '0'){
				onBrdngCtrl.businessGrpErr = true;
			}else{
				onBrdngCtrl.businessGrpErr = false;
			}
		}
		
	}
})();