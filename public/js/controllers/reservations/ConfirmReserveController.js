
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
					var hours = hoursBetween( new Date( $scope.reservations[ i ].start ) , new Date( $scope.reservations[ i ].end ) );
					var total = parseFloat( hours * ( $scope.reservations[ i ].price / 60 ) ).toFixed( 2 );
					var end   = moment( $scope.reservations[ i ].start ).add( 3, 'hours' ).format('DD/MM/YYYY HH:mm');
					var start = moment( $scope.reservations[ i ].end ).add( 3, 'hours' ).format('DD/MM/YYYY HH:mm');
					
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
				$scope.total = 0;
				$scope.count = 0;
				if( $scope.reservations ){
					$scope.reservations.forEach( function( reserve, index) {
						
						if( reserve.approved ) {
							$scope.total +=  parseFloat( reserve.total );
							$scope.count ++;
						}
					});
					
					$scope.total = '$ ' + $scope.total.toFixed(2);
				}
			};

			$scope.goHome = function () {
				$location.path( '/' );
			};

			$scope.onPage = function ( page ) 
			{
				$scope.page = page;
			};

		
			$scope.reserve = function( ) 
			{
				if( $scope.count > 0 ){
					User.storeUser( $scope.user ).success(  function ( data ) {
						$scope.reservations.forEach( function( reserve, i ) {
							if( reserve.approved ) {
								reserve.end   = new Date( reserve.end.toString()   );
								reserve.start = new Date( reserve.start.toString() );
								Reservations.store( reserve ).success( function( data ){
									Message.success('');
									$rootScope.$broadcast( 'clearReservations' );
								})
								.error( function( err ){
									Message.error( 'Error saving reserve' );
								});
							}
						});
					})
					.error( function( err ){
						Message.error( 'Error saving users' );
					});
				} else {
					Message.alert( "You don't have reservations" );
				}
				$location.path( '/' );
			};

			$scope.cancel = function()
			{
				MySession.clear();
				$location.path('/');	
			};


			var hoursBetween = function( data1, data2 )
		    { 
		        var hours=1000*60;
		        var date1_ms = data1.getTime(); 
		        var date2_ms = data2.getTime(); 
		        var difference_ms = date2_ms - date1_ms; 
		        return Math.round(difference_ms/hours); 
		    };

			$scope.init();			
    
	}]);

})();