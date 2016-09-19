(function(){

	'use strict';

	angular.module('services')

		.factory( 'Interceptor' ,[  '$rootScope' ,'$location' , '$q' , function ( $rootScope, $location , $q ) 
		{	
			var interceptor = 
			{
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