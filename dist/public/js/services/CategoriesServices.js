(function(){

	'use strict';

	angular.module('services')

		.factory( 'CategoriesServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getCategories = function () 
			{
				return $http.get('/categories');
			};

			var _getCategory = function () 
			{
				return $http.get('/category/' + $routeParams.id );
			};

			var _deleteCategory = function ( id ) 
			{
				return $http.delete('/category/' + id );
			};

			var _storeCategory = function ( category ) 
			{
				return $http.post( '/category/' , category );
			};

			return {	
				getCategories: _getCategories,
				getCategory:   _getCategory,
				storeCategory: _storeCategory,
				deleteCategory: _deleteCategory
			};
		}]);
})();