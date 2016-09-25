(function(){

	'use strict';

	angular.module('services')

	.controller( 'LoginController' , [ '$scope' , 'UsersServices' ,
		
		function( $scope , UsersServices ){
			$scope.user = { username: '' , password: '' };
			$scope.store = function () {
				UsersServices.authenticate( $scope.user )
					.success(
						function ( user ) 
						{
							var userLogged = {};
							userLogged._id   = user._id;
							userLogged.email = user.email;
							userLogged.name  = user.name;
							userLogged.type  = user.type;

							MySession.set( 'user' , userLogged );
							window.location.href = 'http://localhost:8000/';				
						})
					.error(
						function ( data ) {
							Message.error('Login and/or Password invalids ')
							window.location.href = '/#/auth/login/';
						});
			};
	}]);

})();