(function(){

	'use strict';

	angular.module('services')

		.factory( 'ServicesServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getServices = function () 
			{
				return $http.get('/services');
			};

			var _getService = function () 
			{
				return $http.get('/service/' + $routeParams.id );
			};

			var _deleteService = function ( id ) 
			{
				return $http.delete('/service/' + id );
			};

			var _storeService = function ( service ) 
			{
				return $http.post( '/service/' , service );
			};

			return {	
				getServices: _getServices,
				getService:   _getService,
				storeService: _storeService,
				deleteService: _deleteService
			};
		}]);
})();