
(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReservationsProfessionalController' , [ '$scope' , 'ReservationsServices' ,
		
		function( $scope, Reservations ){
			
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

			$scope.analyze = function( reserve ) {
				console.log('ddd');
			}; 
	}]);

})();