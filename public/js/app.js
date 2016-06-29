(function(){
	
	'use strict';

	angular.module( 'services' , ['ngRoute' ,'angularUtils.directives.dirPagination' ] )
	
	.config( [ '$routeProvider' , 

		function ( $routeProvider ) 
		{

			$routeProvider
				.when('/categories', 
				{
					templateUrl: 'partials/categories/categories.html',
					controller: 'CategoriesController'

				})
				.when('/category/:id', 
				{
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController'
				})
				.when('/category/', 
				{
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController'
				})
				.when('/', 
				{
					templateUrl: 'partials/categories/.html',
					controller: 'CategoryController'
				});

			$routeProvider.otherwise({ redirectTo: '/' });
		}])

})();