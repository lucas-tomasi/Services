(function(){

	'use strict';

	angular.module( 'services' , [  'frapontillo.bootstrap-switch' , 'ngSanitize','ngRoute' , 'jkuri.datepicker' , 'pascalprecht.translate', 'angularUtils.directives.dirPagination' ])

	.config( [ '$routeProvider' , '$httpProvider' ,  '$translateProvider' ,

		function ( $routeProvider , $httpProvider, $translateProvider )
		{
			if( !MySession.get('language') ) MySession.set( 'language', 'pt' );


			$translateProvider
			    .translations('en', MyTranslate.getTranslations( 'en' ) )
			    .translations('pt', MyTranslate.getTranslations( 'pt' ) )
			    .preferredLanguage( MySession.get('language') );

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
/*route services professionals*/
				.when('/actions/reservations/:id', {
					templateUrl: 'partials/actions/reservationsProfessional.html',
					controller: 'ReservationsProfessionalController',
					authorize: [2,3]
				})

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
					authorize: [3] })
				.when('/reports/statistics', {
					templateUrl: 'partials/reports/statistics.html',
					controller: 'ReportStatistcsController',
					authorize: [3]
				})
				.when('/reports/services', {
					templateUrl: 'partials/reports/services.html',
					controller: 'ServicesReportController',
					authorize: [3]
				})

/*routes defaults*/

				.when('/404', {
					templateUrl: 'partials/404.html',
					authorize: false })
/*routes perfil*/
				.when('/myrequests', {
					templateUrl: 'partials/users/myrequests.html',
					controller: 'MyRequestsController',
					authorize: [1,2,3]
				})
				.when('/myaccount', {
					templateUrl: 'partials/users/myaccount.html',
					controller: 'MyAccountController',
					authorize: [1,2,3]
				})
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
				.when('/_=_', {
					redirectTo: '/'
				})

				.when('/logout', {});

			$routeProvider.otherwise({ redirectTo: '/' });
		}])

		.run([ '$rootScope', '$location', 'UsersServices', function ( $rootScope  , $location, User )
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
				if( next && /logout/.test( next.originalPath ) )
				{
					MySession.clear();
					$location.path( '/' );
				}

				var old = MySession.get('urlOld');

				if( old && ( !curr || !/auth/.test( curr.originalPath ) ) )
				{
					MySession.remove('urlOld');
					$location.path( old );
				}

				if( curr && curr.scope )
				{
					history.push( getUrl( curr ) );

					if( next.originalPath == '/auth/' )
					{
						MySession.set( 'urlOld' , history[ history.length - 1 ] );
					}
				}

				if( next )
				{
					if( next.authorize )
					{
						if( !MySession.get( 'user' ) )
						{
							User.getUserLogged().success( function( user ){

								hasAccess( next , user );

								var userLogged = {
									_id   : user._id,
									email : user.email,
									name  : user.name,
									type  : user.type
								};

								MySession.set( 'user' , userLogged );
							});
						}
						else
						{
							hasAccess( next , MySession.get( 'user' ) );
						}
					}
				}

    		});

		}]);
})();
