
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
					obj.dt_end      = Util.formatDateToBR( obj.end );
					obj.dt_start    = Util.formatDateToBR( obj.start );
					obj.desc_status = Util.getStatusReserve( obj.status );
					obj.icon        = Util.getIconReserve( obj.status );
					obj.clazz       = Util.getClassReserve( obj.status );
				});

				Util.generateTable( 'tableReservations' , MyTranslate.get( 'RESERVATIONS' ) );		
					
			});
			
			var analyze = function( reserve ) {

				Reservations.analyze( reserve ).success( function( data ){
					Message.success( '' );
					reserve.desc_status = Util.getStatusReserve( reserve.status );
					reserve.icon        = Util.getIconReserve( reserve.status );
					reserve.clazz       = Util.getClassReserve( reserve.status );
					$('.'+ reserve._id ).modal('hide');
				}).error( function( err ){
					Message.error( MyTranslate.get( 'SORRY' ) );
				});
			};

			$scope.reject = function( reserve ) {
				if( reserve.response ) {
					reserve.status   = 'C';
					reserve.response = Util.scapeToHtml( reserve.response );
					Message.confirm( MyTranslate.get( 'CONFIRM' ) , analyze, reserve );
				} else {
					Message.alert( MyTranslate.get( 'PLEASE_ANSWER' ) );
				}
			};

			$scope.conclude = function( reserve ) {
				reserve.status  = 'X';
				Message.confirm( MyTranslate.get( 'CONFIRM' ) , analyze, reserve );
			};

			$scope.accept = function( reserve ) {
				if( reserve.response ) {
					reserve.status   = 'E';
					reserve.response = Util.scapeToHtml( reserve.response );
					Message.confirm( MyTranslate.get( 'CONFIRM' ) , analyze, reserve );
				} else {
					Message.alert( MyTranslate.get( 'CONFIRM' ) );
				}
			};

	}]);

})();