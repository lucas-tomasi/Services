(function(){

	'use strict';

	angular.module('services')

	.controller( 'CategoryController' , [ '$scope' , 'CategoriesServices' ,
		
		function( $scope , CategoriesServices ){
			
			$scope.init = function () {
			
				$scope.modulo = "Category";
				$scope.nome   = "Lucas Tomasi";
				$scope.info   = { type: '' , message: '' };
				getCategory();
			};

			function getCategory() 
			{
				CategoriesServices.getCategory()

					.success( 
				 		function( data ) 
				 		{
							$scope.category = data;
						})
					.error( 
						function (err) 
						{
				 			$scope.category =  {};
						});
			}
			

			$scope.store = function () {
				console.log($scope.category);
				CategoriesServices.storeCategory( $scope.category )
					.success(
						function ( data ) 
						{
							console.log(data);
							$scope.category = data;
							$scope.info.type = 'success';
							$scope.info.message = 'Success!';
							
						})
					.error(
						function ( data ) {
							$scope.info.type    = 'error';
							$scope.info.message = " Error: " + data.code + ", Contact your administrator";
						});
			};

			$scope.init();
	}]);

})();