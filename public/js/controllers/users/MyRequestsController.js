
(function(){

	'use strict';

	angular.module('services')

	.controller( 'MyRequestsController' , [ '$scope' , 'ReservationsServices' ,
		
		function( $scope, Reservations ){
			var user = MySession.get('user');
			if( user ){
				Reservations.getReservationsByUser( user.email ).success( function( reservations ){
					console.log( reservations );
					$scope.reservations = reservations;
				});
			} else {
				Message.alert('Please, login' );
			}
	}]);

})();