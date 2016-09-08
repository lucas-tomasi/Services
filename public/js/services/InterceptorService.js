(function(){

	'use strict';

	angular.module('services')

		.factory( 'Interceptor' ,[ '$location' , '$q' , function ( $location , $q ) 
		{	
			var interceptor = 
			{
				request: function ( req ) {
					return req;	 
				},
				requestError: function ( req ) {
					console.log('request error');
					console.log( req );
					return req;	 	 
				},
				responseError: function ( res ) {
					 console.log( res.status );
					 if( res.status == 401 )
					 {
					 	console.log('dasdsa');
					 	$location.path('/auth');
					 }
					 return $q.reject( res );
				}
			};

			return interceptor;
		}]);
})();