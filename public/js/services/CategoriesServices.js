(function(){

	'use strict';

	angular.module('services')

		.factory( 'CategoriesServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getCategories = function () 
			{
				return $http.get( '/admin/categories' );
			};

			var _getCategory = function () 
			{
				return $http.get( '/admin/category/' + $routeParams.id );
			};

			var _deleteCategory = function ( id ) 
			{
				return $http.delete( '/admin/category/' + id );
			};

			var _storeCategory = function ( category ) 
			{
				return $http.post( '/admin/category/' , category );
			};

			var _getCategoriesComposite = function () 
			{
				return $http.get( '/public/categoriesComposite/' );		 
			}

			return {	
				getCategories: _getCategories,
				getCategory:   _getCategory,
				storeCategory: _storeCategory,
				deleteCategory: _deleteCategory,
				getCategoriesComposite: _getCategoriesComposite
			};
		}]);
})();