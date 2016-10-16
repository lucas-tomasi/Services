
(function(){

	'use strict';

	angular.module('services')

	.controller( 'ConfirmReserveController' , [ '$rootScope' , '$location' , '$scope' , 'CitiesServices', 'ReservationsServices' , 'UsersServices' ,

		function( $rootScope,  $location, $scope, Cities, Reservations, User )
		{	
			$scope.init = function()
			{
				$scope.page = 1;
				$scope.reservations = MySession.get( 'reservations' );
				$scope.count        = 0;
				$scope.total        = 0;
				
				getCities();
				getUser();

				for( var i in $scope.reservations ) {
					var hours = Util.hoursBetween( new Date( $scope.reservations[ i ].start ) , new Date( $scope.reservations[ i ].end ) );
					var total = parseFloat( hours * ( $scope.reservations[ i ].price / 60 ) ).toFixed( 2 );
					var end   = Util.formatDateToBR( $scope.reservations[ i ].start );
					var start = Util.formatDateToBR( $scope.reservations[ i ].end );
					
					$scope.reservations[ i ].hours    = ( hours / 60 );
					$scope.reservations[ i ].total    = total;
					$scope.reservations[ i ].dt_start = end;
					$scope.reservations[ i ].dt_end   = start;
					$scope.reservations[ i ].approved = true;
				};					
				
				$scope.updateTotals();
			};

			var getCities = function(){
				Cities.getCitiesComposite().success( function( data ){
					$scope.cities = data;
				});
			};

			var getUser = function() {
				User.getUserLogged().success( function( user ){
					$scope.user = user;
				});
			};


			$scope.updateTotals = function () {
				$scope.total = 0, $scope.count = 0;
				if( $scope.reservations ){
					$scope.reservations.forEach( function( reserve, index) {
						
						if( reserve.approved ) {
							$scope.total +=  parseFloat( reserve.total );
							$scope.count ++;
						}
					});
					
					$scope.total = MyTranslate.get( 'MONEY' ) +' ' + $scope.total.toFixed(2);
				}
			};

			$scope.goHome = function () {
				$location.path( '/' );
			};

			$scope.onPage = function ( page ) {
				$scope.page = page;
			};

			$scope.reserve = function() {
				if( $scope.count > 0 ){
					delete $scope.user.image;
					User.saveAddress( $scope.user ).success(  function ( data ) {
						$scope.reservations.forEach( function( reserve, i ) {
							if( reserve.approved ) {
								reserve.end   = new Date( reserve.end.toString()   );
								reserve.start = new Date( reserve.start.toString() );
								Reservations.store( reserve ).success( function( data ){
									Message.success('');
									$rootScope.$broadcast( 'clearReservations' );
								})
								.error( function( err ){
									Message.error( MyTranslate.get( 'ERROR_SERVICE_SAVE' ) );
								});
							}
						});
					})
					.error( function( err ){
						Message.error( MyTranslate.get( 'ERROR_USER_SAVE' ) );
					});
				} else {
					Message.alert( MyTranslate.get( 'NO_RESERVE' ) );
				}
				$location.path( '/' );
			};

			$scope.cancel = function() {
				MySession.clear();
				$location.path('/');	
			};

			$scope.init();			
    
	}]);

})();