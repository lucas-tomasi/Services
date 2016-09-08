(function(){

	'use strict';

	angular.module('services')

	.controller( 'HomeController' , [ '$scope' , 'CategoriesServices' , 'ServicesServices',

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
							for( var i in $scope.services ){
								$scope.services[i].price = parseFloat($scope.services[i].price).toFixed(2);
							}
						})
					.error(
						function ( err ) {
							$scope.services = [];  
						});	 
			}
			
			$scope.init();				
	}]);

})();