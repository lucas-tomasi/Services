(function(){

	'use strict';

	angular.module('services')

		.factory( 'UsersServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getUsers = function () 
			{
				return $http.get('/admin/users');
			};

			var _getUser = function () 
			{
				return $http.get('/admin/user/' + $routeParams.id );
			};

			var _deleteUser = function ( id ) 
			{
				return $http.delete('/admin/user/' + id );
			};

			var _storeUser = function ( category ) 
			{
				return $http.post( '/admin/user/' , category );
			};

			var _getProfessionalsComposite = function () 
			{
				return $http.get( '/admin/professionalsComposite/' );			 
			};

			var _genereteReport = function () 
			{
				return $http.get( '/admin/userReport/' );			 
			};

			var _authenticate = function ( user ) 
			{
				return $http.post( '/login/' , user );			 
			};

			var _getUserLogged = function () {
				 return $http.get( '/public/userLogged' );
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