
(function(){

	'use strict';

	angular.module('services')

	.controller( 'MyRequestsController' , [ '$scope' , 'ReservationsServices' ,

		function( $scope, Reservations ){

			var user = MySession.get('user');

			Reservations.getReservationsByUser( user.email ).success( function( reservations ){

				reservations.forEach( function( obj ){

					var hour = ( Util.hoursBetween( new Date( obj.start ) , new Date( obj.end ) ) );

					obj.hours       = hour / 60 ;
					obj.total       = parseFloat( hour * ( obj.price / 60 ) ).toFixed( 2 );
					obj.dt_end      = Util.formatDateToBR( obj.end );
					obj.dt_start    = Util.formatDateToBR( obj.start );
					obj.desc_status = Util.getStatusReserve( obj.status );
					obj.icon        = Util.getIconReserve( obj.status );
					obj.clazz       = Util.getClassReserve( obj.status );

				});

				$scope.reservations = reservations;

				Util.generateTable( 'tableRequests' , MyTranslate.get( 'MY_AS' ) + " " + MyTranslate.get( 'RESERVATIONS' ) );
			});
	}]);

})();
