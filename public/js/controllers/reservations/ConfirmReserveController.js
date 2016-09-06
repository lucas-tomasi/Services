(function(){

	'use strict';

	angular.module('services')

	.controller( 'ConfirmReserveController' , [ '$cookieStore', '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $cookies, $scope, Categories, Services, Users, Reservations )
		{	
			$scope.init = function()
			{
				$scope.page = 1;
				$scope.user         = $cookies.get( 'user' );
				console.log( $scope.user );
				$scope.reservations = $cookies.get( 'reservations' );
				console.log( $scope.reservations.message );
			};

			$scope.onPage = function ( page ) 
			{
				$scope.page = page;
			};

			$scope.init();			
	}]);

})();