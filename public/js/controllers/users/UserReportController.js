(function(){

	'use strict';

	angular.module('services')

	.controller( 'UserReportController' , [ '$scope' , 'UsersServices' ,
		
		function( $scope , UsersServices ){
			
			$scope.genereteReport = function () {
				 UsersServices.genereteReport()
				 	.success(
				 		function ( data ) {
				 			console.log( data );
				 		})
				 	.error(
				 		function ( err ) {
				 			 console.log( err );
				 		}
				 	);
			}
	}]);

})();