(function(){

	'use strict';

	angular.module('services')

	.controller( 'LoginController' , [ '$scope' , 'UsersServices' ,
		
		function( $scope , UsersServices ){
			
			$scope.user = { username: '' , password: '' };

			$scope.store = function () {
			
				UsersServices.authenticate( $scope.user ).success( function ( data ) {
			
					UsersServices.getUserLogged().success(function(user){
						var userLogged = {
							_id   : user._id,
							email : user.email,
							name  : user.name,
							type  : user.type
						};

						MySession.set( 'user' , userLogged );
								
					});
			
					window.location.href = 'http://localhost:8000/';
			
				}).error( function ( data ) {
			
					Message.error( MyTranslate.get( 'ERR_LOGIN' ) );
			
					window.location.href = '/#/auth/login/';
				});
			};
	}]);

})();