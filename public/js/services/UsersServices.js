(function(){

	'use strict';

	angular.module('services')

		.factory( 'UsersServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getUsers = function () 
			{
				return $http.get('/users');
			};

			var _getUser = function () 
			{
				return $http.get('/user/' + $routeParams.id );
			};

			var _deleteUser = function ( id ) 
			{
				return $http.delete('/user/' + id );
			};

			var _storeUser = function ( category ) 
			{
				return $http.post( '/user/' , category );
			};

			var _getProfessionalsComposite = function () 
			{
				return $http.get( '/professionalsComposite/' );			 
			}

			return {	
				getUsers:   _getUsers,
				getUser:    _getUser,
				storeUser:  _storeUser,
				deleteUser: _deleteUser,
				getProfessionalsComposite : _getProfessionalsComposite
			};
		}]);
})();