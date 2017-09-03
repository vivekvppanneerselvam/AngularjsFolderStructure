/**
 * 
 */
(function(){
	app.factory('userProfileFactory', userProfileFactory);
	userProfileFactory.$inject = ['$q', '$cookies', 'commonService'];
	function userProfileFactory($q, $cookies, commonService){
		var userName = '';
		var firstName = '';
		var lastName = '';
		var email = '';
		var userRoles = [];
		/*var getSSO = function(){
			return $cookies.get('THDSSO');
		};*/
		return {
			/*loadUserProfile : function(){
				return $q(function(resolve, reject) {
					commonService.get('/getUserDetails?sso='+getSSO()).then(function(response){
						if(response.data.errorMessage){
							alert(response.data.errorMessage);
							reject(response.data.errorMessage);
						}else{
							userName = response.data.userId;
							firstName = response.data.firstName;
							lastName = response.data.lastName;
							email = response.data.email;
							var auth = response.data.groups;
							userRoles = [];
							for(var role in auth){
								userRoles.push(auth[role].authority);
							}
							console.log(firstName);
							resolve(true);
						}
					}, function(response){
						reject('error');
					});
				  });
			},*/
			setFirstName : function(fn){
				firstName = fn;
			},
			setLastName : function(ln){
				lastName = ln;
			},
			setUserName : function(un){
				userName = un;
			},
			setUserRoles : function(urs){
				userRoles = urs;
			},
			getFirstName : function(){
				return firstName;
			},
			getLastName : function(){
				return lastName;
			},
			getUserName : function(){
				return userName;
			},
			getUserRoles : function(){
				return userRoles;
			}
		};
	}
})();