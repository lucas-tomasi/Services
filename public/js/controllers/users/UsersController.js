(function(){

	'use strict';

	angular.module('services')

	.controller( 'UsersController' , [ '$scope' , 'UsersServices' ,

		function( $scope, UsersServices )
		{			
			$scope.init = function()
			{
				$scope.columns = [
					{ title: 'Code'     , type: 'code'       , key: '_id'      , id: '_id' },
					{ title: 'Name'     , type: 'link'       , key: 'name'     , id: '_id' },
					{ title: 'Login'    , type: 'link'       , key: 'login'    , id: '_id' },
					{ title: 'E-mail'   , type: 'link'       , key: 'email'    , id: '_id' },
					{ title: 'Provider' , type: 'link'       , key: 'provider' , id: '_id' },
					{ title: 'Active'   , type: 'check'      , key: 'active'   , id: '_id' },
					{ title: ''         , type: 'btn-delete' , key: ''         , id: '_id' }
				];

				getUsers();
			
			};	

			$scope.delete = function ( id ) 
			{
				UsersServices.deleteUser( id ).success( function ( data ) {
					getUsers();
					Message.alert( MyTranslate.get( 'DELETED' ) );
				});
			};

			function getUsers() {
				UsersServices.getUsers().success( function( data ) {
					$scope.users = data;
				}).error( function (status) {
		 			$scope.users =  [];
				});
			}

			$scope.init();				
	}]);

})();