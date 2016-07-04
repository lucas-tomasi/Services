(function(){

	'use strict';

	angular.module('services')

	.controller( 'CategoriesController' , [ '$scope' , 'CategoriesServices' ,

		function( $scope, CategoriesServices )
		{			
			$scope.init = function()
			{

				$scope.sort = function( keyname )
				{
					$scope.sortKey = keyname;
					$scope.reverse = !$scope.reverse;
				}

				$scope.modulo = "Categories";
				$scope.nome = "Lucas Tomasi";
				
				getCategories();

				$scope.onDelete = function ( category ) {
					if( category.delete == 'undefined' )
					{
						category.delete = true;
					}
					else
					{
						category.delete = !category.delete;
					}
				}
				
				$scope.delete = function ( id ) 
				{
					CategoriesServices.deleteCategory( id )	

					.success(
						function ( data ) 
						{
							getCategories();
						});
				};
			};			

			function getCategories() 
			{
				CategoriesServices.getCategories()
			 	
			 	.success( 
			 		function( data ) {
						$scope.categories = data;
					})
				.error( 
					function (status) {
			 			$scope.categories =  [];
					});
			}

			$scope.init();				
	}]);

})();