(function(){

	'use strict';

	angular.module('services')

	.controller( 'CategoryController' , [ '$scope' , 'CategoriesServices' ,
		
		function( $scope , CategoriesServices ){
			
			$scope.init = function () {
			
				$scope.modulo = "Category";
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
				CategoriesServices.storeCategory( $scope.category )
					.success(
						function ( data ) 
						{
							Message.success("Category saved");
							$scope.category = data;							
						})
					.error(
						function ( data ) {
							var message = '';
							for(  var index in data.errors )
							{
								message = data.errors[index].message + '<br>';
							}

							Message.error( message );
						});
			};

			$scope.init();
	}]);

})();