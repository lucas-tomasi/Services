(function(){

	'use strict';

	angular.module('services')

		.factory( 'Interceptor' ,[  '$rootScope' ,'$location' , '$q' , function ( $rootScope, $location , $q ) 
		{	
			var interceptor = 
			{
				response: function ( res ) {
					$rootScope.$broadcast( 'onLoad' , false );  
					return res;
				},
				request: function ( req ) {
					$rootScope.$broadcast( 'onLoad' , true ); 
					return req;	 
				},
				requestError: function ( req ) {
					$rootScope.$broadcast( 'onLoad' , false );  
					return req;	 	 
				},
				responseError: function ( res ) {
					$rootScope.$broadcast( 'onLoad' , false );  
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