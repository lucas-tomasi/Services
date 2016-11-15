(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReserveController' , [ '$rootScope' , '$location', '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $rootScope, $location, $scope, Categories, Services, Users, Reservations )
		{
			$scope.new_comment      = '';
			$scope.teste      = '';
			$scope.cont             = 0;
			$scope.new_reservations = [];
			$scope.lang = MySession.get('language');
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

			function getServices () {
				Services.getServicePublic().success( function ( data ) {
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
								}
								return service;
							});
						}
					});
				}).error( function ( err ) {
					$scope.service = [];
				});
			}

			$scope.paintYellow = function ( star ) {
				if( !$scope.starClicked ) {
					$scope.cont = star;
				}
				console.log($scope.new_comment);
				console.log($scope.teste);
			};

			$scope.clickStar = function ( star ) {
				$scope.starClicked = !$scope.starClicked;
			};

			$scope.comment = function ( co )
			{
				$scope.new_comment = co;
				if( $scope.user ) {
					if( $scope.new_comment ) {
						var new_comment = $scope.new_comment.replace( /\r\n|\r|\n/g	, "<br>" );

						var comment = { service: $scope.service._id  ,  username: $scope.user.name, comment: new_comment , stars: $scope.cont , date: new Date() };

						Services.storeCommentService( comment ).success(function(data){
						}).error(function(err){
							console.log(err);
						});

						comment.date =  moment( comment.date ).format('DD MMMM YYYY HH:mm:ss');

						$scope.service.comments.unshift( comment );

						$scope.cont = 0 , $scope.new_comment = '';
					}
				} else {
					Message.alert( MyTranslate.get( 'PLEASE_LOGIN' ) );
				}
			};

			$scope.makeReservetions = function () {
				$location.path( '/confirm/reserve/' );
			}

			$scope.init();
	}]);

})();
