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
			};

			var _genereteReport = function () 
			{
				return $http.get( '/userReport/' );			 
			};

			var _authenticate = function ( user ) 
			{
				return $http.post( '/login/' , user );			 
			};

			var _getUserLogged = function () {
				 return $http.get( '/userLogged' );
			};

			return {	
				getUsers:   _getUsers,
				getUser:    _getUser,
				storeUser:  _storeUser,
				deleteUser: _deleteUser,
				authenticate: _authenticate,
				getUserLogged: _getUserLogged,
				genereteReport: _genereteReport,
				getProfessionalsComposite : _getProfessionalsComposite
			};
		}]);
})();