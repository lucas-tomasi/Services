(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServiceController' , [ '$scope' , 'ServicesServices' , 'UsersServices' , 'CategoriesServices' ,
		
		function( $scope , ServicesServices, UsersServices, CategoriesServices ){
			
			$scope.init = function () {
				getCategories();
				getService();
			};

			function getService() 
			{
				ServicesServices.getService()

					.success( 
				 		function( data ) 
				 		{
				 			if( !data.professional )
				 			{
				 				UsersServices.getUserLogged()
				 					.success( function ( user ) {
				 						$scope.service    = data;	
				 						$scope.service.professional = user._id;			
				 						$scope.service.professionalname = user.name;			
				 						$scope.service.description = $scope.service.description.replace( /<br>/g , "\n" );
				 					});
				 			}
				 			else
				 			{
				 				var name = data.professional.name;
				 				var _id  = data.professional._id;
				 				$scope.service    = data;	
				 				$scope.service.professional     = _id;	
				 				$scope.service.professionalname = name;
				 				$scope.service.description = $scope.service.description.replace( /<br>/g , "\n" );
				 			}
						})
					.error( 
						function (err) 
						{
				 			$scope.service =  {};
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
				$scope.service.description = $scope.service.description.replace( /\r\n|\r|\n/g	, "<br>" );
				ServicesServices.storeService( $scope.service )
					.success(
						function ( data ) 
						{
							Message.success("Service saved");
							$scope.service = data;	
							$scope.service.professionalname = data.professional.name;
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