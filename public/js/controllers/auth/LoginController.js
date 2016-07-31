(function(){

	'use strict';

	angular.module('services')

	.controller( 'LoginController' , [ '$scope' , 'UsersServices' ,
		
		function( $scope , UsersServices ){
			$scope.user = { username: '' , password: '' };
			$scope.store = function () {
				console.log( $scope.user );
				UsersServices.authenticate( $scope.user )
					.success(
						function ( data ) 
						{
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