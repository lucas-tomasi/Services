(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReserveController' , [ '$rootScope' , '$location', '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $rootScope, $location, $scope, Categories, Services, Users, Reservations )
		{	
			$scope.new_comment      = '';
			$scope.cont             = 0;
			$scope.new_reservations = [];
			delete $scope.reservations;
			$scope.init = function()
			{
				getUserLogged();
				getServices();
			};			

			$scope.hasMake = function () {
				 return  ( !$scope.user || ( !MySession.get('reservations') || MySession.get('reservations').length == 0 ) );
			}

			function getUserLogged( )
			{
				Users.getUserLogged().then( user => $scope.user = user.data );
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
							
							$scope.service.comments = $scope.service.comments.map( function( comment ){
								comment.date = moment( comment.date ).format('DD MMMM YYYY HH:mm:ss');
								return comment;
							});

							Reservations.getReservationsByService().success( function ( data ) {
								$scope.services_reservations = (data)? data : [];
								$scope.services_reservations = $scope.services_reservations.map( function( service ){
									service.editable = false;
									return service;
								});
								var reservations = MySession.get( 'reservations' );
								if( reservations ) {
									reservations.map( function( service ){										
										if( service.ref_service == $scope.service._id ){
											$scope.services_reservations.push( service );
											console.log(1);
										}
										return service;
									});
								}
							});
						})
					.error(
						function ( err ) {
							$scope.service = [];  
						});	 
			}
			
			$scope.paintYellow = function ( star ) 
			{
				if( !$scope.starClicked )
				{
					$scope.cont = star;
				}
			};

			$scope.clickStar = function ( star ) 
			{
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

			$scope.addToCart =  function () 
			{
				var reservations = MySession.get( 'reservations' );
				

				if( reservations )
				{
					reservations = reservations.filter( function ( value ) {
						 return value.service != $scope.service._id;
					});
					
					if( $scope.new_reservations )
					{
						for( var i in $scope.new_reservations )
						{						 
							reservations.push( $scope.new_reservations[ i ] );
						}

						for( var i in $scope.services_reservations )
						{						 
							if( $scope.services_reservations[ i ].editable )
							{
								reservations.push( $scope.services_reservations[ i ] );
							}
						}
					}
				}
				else
				{
					reservations = $scope.new_reservations;
				}

				$rootScope.$broadcast( 'updateCart', reservations );
			};

			$scope.makeReservetions = function () 
			{	
				//$scope.addToCart();
				
				$location.path( '/confirm/reserve/' );
			}

			$scope.init();				
	}]);

})();