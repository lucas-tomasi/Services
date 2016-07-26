(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServicesController' , [ '$scope' , 'ServicesServices' ,

		function( $scope, ServicesServices )
		{			
			$scope.init = function()
			{
				$scope.columns = [
					{ title: 'Code'   , type: 'code'       , key: '_id'   , id: '_id' },
					{ title: 'Title'  , type: 'link'       , key: 'title' , id: '_id' },
					{ title: 'Active' , type: 'check'      , key: 'active', id: '_id' },
					{ title: ''       , type: 'btn-delete' , key: ''      , id: '_id' }
				];

				getServices();
			
				$scope.delete = function ( id ) 
				{
					ServicesServices.deleteCategory( id )	

					.success(
						function ( data ) 
						{
							getServices();
							Message.alert( 'Service: ' + id + ', deleted successfully' );
						});
				};
			};			

			function getServices() {

				ServicesServices.getServices()
			 	
			 	.success( 
			 		function( data ) {
						$scope.services = data;
					})
				.error( 
					function (status) {
			 			$scope.services =  [];
					});
			}

			$scope.init();				
	}]);

})();