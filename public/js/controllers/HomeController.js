(function(){

	'use strict';

	angular.module('services')

	.controller( 'HomeController' , [ '$scope' , 'CategoriesServices' , 'ServicesServices' ,

		function( $scope, Categories, Services )
		{			
			$scope.init = function()
			{
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