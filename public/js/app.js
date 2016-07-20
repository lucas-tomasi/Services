(function(){
	
	'use strict';

	angular.module( 'services' , [  'frapontillo.bootstrap-switch' , 
									'ngRoute' ,
									'angularUtils.directives.dirPagination'
								 ])
	
	.config( [ '$routeProvider' , '$httpProvider' , 

		function ( $routeProvider , $httpProvider ) 
		{

			$httpProvider.interceptors.push('Interceptor');
			$routeProvider

/*routes categories*/

				.when('/categories', {
					templateUrl: 'partials/categories/categories.html',
					controller: 'CategoriesController' })
				.when('/category/:id', {
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController' })
				.when('/category/', {
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController' })

/*routes users*/

				.when('/users', {
					templateUrl: 'partials/users/users.html',
					controller: 'UsersController' })
				.when('/user/:id', {
					templateUrl: 'partials/users/user.html',
					controller: 'UserController' })
				.when('/user/', {
					templateUrl: 'partials/users/user.html',
					controller: 'UserController' })

/*routes auth*/

				.when('/auth', {
					templateUrl: 'partials/auth/auth.html' })
		
/*routes defaults*/
		
				.when('/404', {
					templateUrl: 'partials/404.html' })
				.when('/', {
					templateUrl: 'partials/teste.html',
					controller: 'TesteController'
				});

			$routeProvider.otherwise({ redirectTo: '/404' });
		}]);
})();
