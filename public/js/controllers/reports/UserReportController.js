(function(){

	'use strict';

	angular.module('services')

	.controller( 'UserReportController' , [ '$scope' , 'ReservationsServices' , 'CitiesServices' ,
		
		function( $scope , Reservations, Cities ){
		
			$scope.init = function() {
				$scope.filter    = {};
				$scope.states    = Util.getStates();
				$scope.providers = Util.getProviders();
				getTypes();
				getCities();
			};

			var getTypes = function() {
				$scope.types = [
					{ id: '1' , text: 'Users' },
					{ id: '2' , text: 'Professionals'},
					{ id: '3' , text: 'Admin' }
				];
			};			
		
			var getCities = function() {
				Cities.getCitiesComposite().success( function( data ){
					$scope.cities = data;
				});
			};

			$scope.generate = function () {
				Reservations.getReservationsReportUser( $scope.filter ).success( function ( data ) {
		 			
		 			$scope.users = data;
		 			Util.generateTable( 'tableUserReports' , 'Report User' );
		 			
		 			$('.report-form').addClass('close-form');
		 			$('.report').addClass('open-form');

		 		}).error( function ( err ) {
		 			Message.error( "" );	
		 		});
			};

			$scope.back = function(){
				$('.report-form').removeClass('close-form');
		 		$('.report').removeClass('open-form');
			}	

			$scope.init();
	}]);

})();