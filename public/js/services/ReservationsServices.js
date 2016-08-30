(function(){

	'use strict';

	angular.module('services')

		.factory( 'ReservationsServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getReservationsByService = function () 
			{
				return $http.get('/public/reservations/service/' + $routeParams.id );
			};

			var _getReservationsByUser = function () 
			{
				return $http.get('/public/reservations/user/' + $routeParams.id );
			};

			return {	
				getReservationsByUser: _getReservationsByUser,
				getReservationsByService: _getReservationsByService
			};
		}]);
})();