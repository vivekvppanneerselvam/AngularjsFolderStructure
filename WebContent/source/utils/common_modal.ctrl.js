(function() {
	'use strict';
	app.controller('commonModalCtrl',
			commonModalCtrl);
	commonModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'MODAL', 'modalParam' ];
	function commonModalCtrl($scope, $uibModalInstance, MODAL, modalParam) {
		$scope.primaryBtnTxt = modalParam.primaryBtnTxt;
		if(modalParam.secondaryBtnTxt == undefined || modalParam.secondaryBtnTxt === ''){
			$scope.isReq = false;
		}else{
			$scope.isReq = true;
			$scope.secondaryBtnTxt = modalParam.secondaryBtnTxt;
		}
		if(modalParam.modalType == MODAL.TYPES.CONFIRM){
			$scope.headerClass = 'success';
		}else if(modalParam.modalType == MODAL.TYPES.INFO){
			$scope.headerClass = 'info';
		}else if(modalParam.modalType == MODAL.TYPES.SUCESS){
			$scope.headerClass = 'success';
		}else if(modalParam.modalType == MODAL.TYPES.ERROR){
			$scope.headerClass = 'error';
		}else if(modalParam.modalType == MODAL.TYPES.WARN){
			$scope.headerClass = 'warning';
		}
		$scope.modalTitle = modalParam.modalTitle;
		$scope.modalMsg = modalParam.modalMsg;
		$scope.modalMsg2 = modalParam.modalMsg2;
		$scope.modalMsg3 = modalParam.modalMsg3;
		$scope.ok = function() {
			$uibModalInstance.close();
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss();
		};
	}
})();