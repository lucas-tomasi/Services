
(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReservationsProfessionalController' , [ '$scope' , 'ReservationsServices' ,
		
		function( $scope, Reservations ){
			
			$scope.init = function() {
				getReservations();
			};

			var getReservations = function() {
	
				var user = MySession.get('user');

				Reservations.getReservationsByProfessional( user._id ).success( function( reservations ){
					$scope.reservations = reservations;

					$scope.reservations.forEach( function( obj ){
						var hour = ( Util.hoursBetween( new Date( obj.start ) , new Date( obj.end ) ) );
						
						obj.hours       = hour / 60 ;
						obj.total       = parseFloat( hour * ( obj.price / 60 ) ).toFixed( 2 );
						obj.price       = parseFloat( obj.price ).toFixed( 2 );
						obj.dt_end      = Util.formatDateToBR( obj.start );
						obj.dt_start    = Util.formatDateToBR( obj.end );
						obj.desc_status = Util.getStatusReserve( obj.status );
						obj.icon        = Util.getIconReserve( obj.status );
						obj.clazz       = Util.getClassReserve( obj.status );
						
					});
					
					Util.generateTable( 'tableReservations' , 'Reservations' );
				
				});
			};

			var analyze = function( reserve ) {
				Reservations.analyze( reserve ).success( function( data ){
					getReservations();
					Message.success( '' );
				}).error( function( err ){
					Message.error( 'Sorry, there was an error' );
				});
			};

			$scope.reject = function( reserve ) {
				if( reserve.response ) {
					reserve.status  = 'C';
					Message.confirm( 'Confirm reject' , analyze, reserve );
				} else {
					Message.alert( 'Please, write a answer!' );
				}
			};

			$scope.accept = function( reserve ) {
				if( reserve.response ) {
					reserve.status = 'E';
					Message.confirm( 'Confirm Accept' , analyze, reserve );
				} else {
					Message.alert( 'Please, write a answer!' );
				}
			};

			$scope.init();
	}]);

})();