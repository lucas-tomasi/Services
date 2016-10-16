(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServiceController' , [ '$scope' , 'ServicesServices' , 'UsersServices' , 'CategoriesServices' ,
		
		function( $scope , ServicesServices, UsersServices, CategoriesServices ){
			
			$scope.init = function () {
				getCategories();
				getService();
			};

			function getService() {
				ServicesServices.getService().success( function( data ) {
		 			if( !data.professional ){
		 				UsersServices.getUserLogged().success( function ( user ) {
	 						$scope.service    = data;	
	 						$scope.service.professional = user._id;			
	 						$scope.service.professionalname = user.name;			
	 						$scope.service.description = $scope.service.description.replace( /<br>/g , "\n" );
	 					});
		 			} else {
		 				var name = data.professional.name;
		 				var _id  = data.professional._id;
		 				$scope.service    = data;	
		 				$scope.service.professional     = _id;	
		 				$scope.service.professionalname = name;
		 				$scope.service.description = $scope.service.description.replace( /<br>/g , "\n" );
		 			}
				}).error( function (err) {
		 			$scope.service =  {};
				});
			}
			
			function getCategories() {
				CategoriesServices.getCategoriesComposite().success( function ( data ){
					$scope.categories = data;
				}).error( function ( error ) {
					$scope.categories = [];
				});
			}

			$scope.store = function () {
				var date_end = $scope.service.dt_end.split( '/' );
				$scope.service.description = $scope.service.description.replace( /\r\n|\r|\n/g	, "<br>" );
				$scope.service.dt_end      = new Date( date_end[2] ,date_end[1] ,date_end[0] ).toISOString();
				ServicesServices.storeService( $scope.service ).success( function ( data ) {
					Message.success( MyTranslate.get( 'SAVE' ) );
					$scope.service = data;	
					$scope.service.professionalname = data.professional.name;
				}).error( function ( data ) {
					var message = '';
					for(  var index in data.errors ) {
						message = data.errors[index].message + '\n';
					}
					Message.error( message );
				});
			};

			$scope.init();
	}]);

})();