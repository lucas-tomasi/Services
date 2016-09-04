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
				Reservations.getReservationsByService().then( reservations => $scope.services_reservations = reservations.data );
			}

			function getServices () 
			{
				Services.getServicePublic()
					.success(
						function ( data ) {
							$scope.service = data;
							$scope.service.comments.sort( function ( one , two ) {
								 return two.date > one.date;
							});
							for( var i in $scope.service.comments ){
								$scope.service.comments[i].date = moment( $scope.service.comments[i].date ).format('DD MMMM YYYY HH:mm:ss');
							}
						})
					.error(
						function ( err ) {
							$scope.service = [];  
						});	 
			}
			
			$scope.paintYellow = function ( star ) {
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
					if( $scope.new_comment )
					{
						var new_comment = $scope.new_comment.replace( /\r\n|\r|\n/g	, "<br>" );
					
						var comment = { service: $scope.service._id  ,  username: $scope.user.name, comment: new_comment , stars: $scope.cont , date: new Date() };
						
						Services.storeCommentService( comment ).then();

						comment.date =  moment( comment.date ).format('DD MMMM YYYY HH:mm:ss');

						$scope.service.comments.unshift( comment );

						$scope.cont = 0;
						$scope.new_comment = '';
					}
				}
				else
				{
					Message.alert( 'please login');	
				}
			};

			$scope.makeReservation = function () {
				for( i in $scope.services_reservations ) {
					var reserve = $scope.services_reservations;
				}
			}

			$scope.init();				
	}]);

})();