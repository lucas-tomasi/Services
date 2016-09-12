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
					return req;	 	 
				},
				responseError: function ( res ) {
					 if( res.status == 401 ) {
					 	Message.alert( 'Access Denied' );
					 	$location.path('/auth');
					 }
					 return $q.reject( res );
				}
			};

			return interceptor;
		}]);
})();