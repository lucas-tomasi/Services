(function(){

	'use strict';

	angular.module('services')

		.factory( 'Interceptor' ,[ '$location' , '$q' , function ( $location , $q ) 
		{	
			var interceptor = 
			{
				responseError: function ( res ) {
					 if( res.status == 401 )
					 {
					 	$location.path('/auth');
					 }

					 return $q.reject( res );
				}
			};

			return interceptor;
		}]);
})();