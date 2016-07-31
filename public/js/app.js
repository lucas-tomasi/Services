(function(){
	
	'use strict';

	angular.module( 'services' , [  'frapontillo.bootstrap-switch' , 
									'ngRoute' , 'jkuri.datepicker' ,
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

/*routes services*/

				.when('/services', {
					templateUrl: 'partials/services/services.html',
					controller: 'ServicesController' })
				.when('/service/:id', {
					templateUrl: 'partials/services/service.html',
					controller: 'ServiceController' })
				.when('/service/', {
					templateUrl: 'partials/services/service.html',
					controller: 'ServiceController' })

/*routes auth*/

				.when('/auth', {
					templateUrl: 'partials/auth/auth.html' })
				.when('/auth/login', {
					templateUrl: 'partials/auth/login.html',
					controller: 'LoginController' })
/*routes reports*/
				
				.when('/reports/users', {
					templateUrl: 'partials/reports/users.html',
					controller: 'UserReportController' })
		
/*routes defaults*/
		
				.when('/404', {
					templateUrl: 'partials/404.html' })
				.when('/', {
					templateUrl: 'partials/teste.html',
					controller: 'TesteController'
				})
				.when('/_=_', {
				});

			$routeProvider.otherwise({ redirectTo: '/404' });
		}]);
})();
