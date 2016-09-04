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

			var _getServicePublic = function () 
			{
				return $http.get('/public/service/' + $routeParams.id );
			};

			var _deleteService = function ( id ) 
			{
				return $http.delete('/admin/service/' + id );
			};

			var _storeService = function ( service ) 
			{
				return $http.post( '/admin/service/' , service );
			};

			var _storeCommentService = function ( comment ) 
			{
				return $http.post( '/protected/service/comment' , comment );
			};

			return {	
				getServices: _getServices,
				getService:   _getService,
				getServicePublic:   _getServicePublic,
				storeService: _storeService,
				deleteService: _deleteService,
				getServicesPublic: _getServicesPublic,
				storeCommentService: _storeCommentService
			};
		}]);
})();