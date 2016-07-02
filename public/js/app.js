(function(){
	
	'use strict';

	angular.module( 'services' , ['ngRoute' ,'angularUtils.directives.dirPagination' ] )
	
	.config( [ '$routeProvider' , '$httpProvider' , 

		function ( $routeProvider , $httpProvider ) 
		{

			$httpProvider.interceptors.push('Interceptor');
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
				.when('/auth', {
					templateUrl: 'partials/auth/auth.html'
				});

			$routeProvider.otherwise({ redirectTo: '/' });
		}]);
})();