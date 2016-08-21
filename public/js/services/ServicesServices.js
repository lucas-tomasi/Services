(function(){

	'use strict';

	angular.module('services')

		.factory( 'ServicesServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getServices = function () 
			{
				return $http.get('/admin/services');
			};

			var _getServicesPublic = function () 
			{
				return $http.get('/public/services');
			};

			var _getService = function () 
			{
				return $http.get('/admin/service/' + $routeParams.id );
			};

			var _deleteService = function ( id ) 
			{
				return $http.delete('/admin/service/' + id );
			};

			var _storeService = function ( service ) 
			{
				return $http.post( '/admin/service/' , service );
			};

			return {	
				getServices: _getServices,
				getService:   _getService,
				storeService: _storeService,
				deleteService: _deleteService,
				getServicesPublic: _getServicesPublic
			};
		}]);
})();