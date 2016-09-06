(function(){
	
	'use strict';

	angular.module( 'services' , [  'frapontillo.bootstrap-switch' , 'ngSanitize',
									'ngRoute' , 'ngCookies' , 'jkuri.datepicker' ,
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
					controller: 'CategoriesController',
					authorize: [3] })
				.when('/category/:id', {
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController',
					authorize: [3] })
				.when('/category/', {
					templateUrl: 'partials/categories/category.html',
					controller: 'CategoryController',
					authorize: [3] })

/*routes users*/

				.when('/users', {
					templateUrl: 'partials/users/users.html',
					controller: 'UsersController',
					authorize: [3] })
				.when('/user/:id', {
					templateUrl: 'partials/users/user.html',
					controller: 'UserController',
					authorize: [3] })
				.when('/user/', {
					templateUrl: 'partials/users/user.html',
					controller: 'UserController',
					authorize: [3] })

/*routes services*/

				.when('/services', {
					templateUrl: 'partials/services/services.html',
					controller: 'ServicesController',
					authorize: [2,3] })
				.when('/service/:id', {
					templateUrl: 'partials/services/service.html',
					controller: 'ServiceController',
					authorize: [2,3] })
				.when('/service/', {
					templateUrl: 'partials/services/service.html',
					controller: 'ServiceController',
					authorize: [2,3] })

/*routes auth*/

				.when('/auth', {
					templateUrl: 'partials/auth/auth.html',
					authorize: false })
				.when('/auth/login', {
					templateUrl: 'partials/auth/login.html',
					controller: 'LoginController',
					authorize: false })
/*routes reports*/
				
				.when('/reports/users', {
					templateUrl: 'partials/reports/users.html',
					controller: 'UserReportController',
					authorize: [2,3] })
		
/*routes defaults*/
		
				.when('/404', {
					templateUrl: 'partials/404.html',
					authorize: false })

/*routes home*/
				.when('/', {
					templateUrl: 'partials/home/home.html',
					controller: 'HomeController',
					auhtorize: false })
				.when('/reserve/:id', {
					templateUrl: 'partials/home/reserveService.html',
					controller: 'ReserveController',
					authorize: false })
				.when('/confirm/reserve/', {
					templateUrl: 'partials/home/confirm.html',
					controller: 'ConfirmReserveController',
					authorize: [1,2,3]
				})
				.when('/confirm/myaccount/', {
					templateUrl: 'partials/home/confirm.html',
					controller: 'ConfirmReserveController',
					authorize: [1,2,3]
				})
				.when('/_=_', {
					redirectTo: '/'
				})
				.when('/teste/asd/', {
					controller: 'TesteController',
					templateUrl: 'partials/teste.html',
					authorize: false
				});

			$routeProvider.otherwise({ redirectTo: '/404' });
		}])

		.run([ '$rootScope', '$location', 'UsersServices', '$cookieStore' , function ( $rootScope  , $location, User, $cookies ) 
		{
			var getUrl = function ( route ) 
			{
					var url = route.originalPath;
					url     = url.replace( /(?:([^\/]+))$/ , route.params.id );		 
					return url;
			};

			var hasAccess = function ( next , user ) 
			{
				if( next.authorize.indexOf( user.type ) != -1 )
				{
					$location.path( $location.$$path );
				}
				else
				{
					var url = history.length > 1 ? history[ history.length - 1 ] : "/";
					
					if( next.authorize.indexOf(1) != -1 )
					{
						Message.alert( 'Please login' );
						$location.path( '/auth/' );
					}
					else 
					{
						$location.path( url );
						Message.error( 'Permission Denied!' );
					} 
				}
			}

    		var history = [];
			
			$rootScope.$on( "$routeChangeStart" , function( event, next, curr ) 
			{
				var old = $cookies.get('urlOld');
				
				if( old && ( !curr || !/auth/.test( curr.originalPath ) ) )
				{
					$cookies.remove('urlOld');
					$location.path( old );
				}	

				if( curr && curr.scope )
				{	
					history.push( getUrl( curr ) );
					
					if( next.originalPath == '/auth/' )
					{
						$cookies.put( 'urlOld' , history[ history.length - 1 ] );
					}
				}

				if( next )
				{
					if( next.authorize )
					{
						var user = $cookies.get('user');
						
						if( user )
						{
							hasAccess( next , user );
						}
						else
						{
							User.getUserLogged().success( function( user ){ 
								$cookies.put( 'user' , user );
								hasAccess( next , user );
							});
						}
					}
				}

    		});

		}]);
})();