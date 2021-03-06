(function(){

	'use strict';

	angular.module('services')

		.factory( 'ReservationsServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getReservationsByService = function () 
			{
				return $http.get('/public/reservations/service/' + $routeParams.id );
			};

			var _getReservationsByUser = function ( email ) 
			{
				return $http.get('/protected/reservations/user/' + email );
			};

			var _getReservationsByProfessional = function ( email ) 
			{
				return $http.get('/protected/reservations/professional/' + email );
			};

			var _store = function ( reserve ) 
			{
				return $http.post('/protected/reserve/store/' , reserve );	
			};

			var _analyze = function ( reserve ) 
			{
				return $http.post('/protected/reserve/analyze/' , reserve );	
			};

			var _getReserationsServicesDrilldown = function()
			{
				return $http.get( '/admin/reserationsServicesDrilldown' );
			};

			var _getStatusReservationsDrilldown = function()
			{
				return $http.get( '/admin/statusReservationsDrilldown' );
			};

			var _getReservationsReportUser = function( filter ) 
			{
				return $http.post( '/admin/reservationsReportUser', filter );
			};

			var _getReservationsReportServices = function( filter ) 
			{
				return $http.post( '/admin/reservationsReportServices', filter );
			};

			return {	
				getReservationsByUser: _getReservationsByUser,
				getReservationsByProfessional: _getReservationsByProfessional,
				getReservationsByService: _getReservationsByService,
				store: _store,
				analyze: _analyze,
				getReserationsServicesDrilldown: _getReserationsServicesDrilldown,
				getStatusReservationsDrilldown: _getStatusReservationsDrilldown,
				getReservationsReportUser: _getReservationsReportUser,
				getReservationsReportServices: _getReservationsReportServices
			};
		}]);
})();