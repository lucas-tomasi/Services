(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServiceController' , [ '$scope' , 'ServicesServices' , 'UsersServices' , 'CategoriesServices' ,
		
		function( $scope , ServicesServices, UsersServices, CategoriesServices ){
			
			$scope.init = function () {
				getService();
				getCategories();
				getProfessionals();
			};

			function getService() 
			{
				ServicesServices.getService()

					.success( 
				 		function( data ) 
				 		{
							$scope.service = data;
						})
					.error( 
						function (err) 
						{
				 			$scope.service =  {};
						});
			}

			function getProfessionals() 
			{
				UsersServices.getProfessionalsComposite()

					.success(
						function ( data ) 
						{
							$scope.professionals = data;
						})
					.error(
						function ( error ) 
						{
							$scope.professionals = [];
						});
			}
			
			function getCategories() 
			{
				CategoriesServices.getCategoriesComposite()

					.success(
						function ( data ) 
						{
							$scope.categories = data;
						})
					.error(
						function ( error ) 
						{
							$scope.categories = [];
						});
			}

			$scope.store = function () {
				ServicesServices.storeService( $scope.service )
					.success(
						function ( data ) 
						{
							Message.success("Service saved");
							$scope.service = data;							
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