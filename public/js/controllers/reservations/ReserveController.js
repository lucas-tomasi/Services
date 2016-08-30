(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReserveController' , [ '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $scope, Categories, Services, Users, Reservations )
		{	
			$scope.new_comment = '';
			$scope.cont        = 0;

			$scope.init = function()
			{
				getServices();
				getUserLogged();
				getReserves();
			};			

			function getUserLogged( )
			{
				Users.getUserLogged().then( user => $scope.user = user.data );
			}

			function getReserves() 
			{
				Reservations.getReservationsByService().then( reservations => $scope.reservations = resevations.data );
			}

			function getServices () 
			{
				Services.getServicePublic()
					.success(
						function ( data ) {
							$scope.service = data;
							$scope.service.price = $scope.service.price.toFixed( 2 );
							console.log( data );
						})
					.error(
						function ( err ) {
							$scope.service = [];  
						});	 
			}
			
			$scope.pintaAmarelo = function ( star ) {
				if( !$scope.starClicked )
				{
					$scope.cont = star;
				}
			};

			$scope.clickStar = function ( star ) {
				$scope.starClicked = !$scope.starClicked;
			};

			$scope.comment = function () 
			{
				if( $scope.user )
				{
					var comment = { username: $scope.user.name, comment: $scope.new_comment , stars: $scope.cont , date: new Date() };
					 				 
					$scope.service.comments.push( comment );
				}
				else
				{
					Message.alert( 'please login');	
				}
			};

			$scope.init();				
	}]);

})();