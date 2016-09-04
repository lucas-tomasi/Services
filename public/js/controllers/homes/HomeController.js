(function(){

	'use strict';

	angular.module('services')

	.controller( 'HomeController' , [ '$scope' , 'CategoriesServices' , 'ServicesServices' , '$cookieStore' ,

		function( $scope, Categories, Services ,$cookieStore )
		{			
			$scope.init = function()
			{
				console.log( $cookieStore.get('teste') );
				getServices();
			};			

			function getServices () 
			{
				Services.getServicesPublic()
					.success(
						function ( data ) {
							$scope.services = data;
						})
					.error(
						function ( err ) {
							$scope.services = [];  
						});	 
			}
			
			$scope.init();				
	}]);

})();