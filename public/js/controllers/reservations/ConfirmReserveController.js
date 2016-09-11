
(function(){

	'use strict';

	angular.module('services')

	.controller( 'ConfirmReserveController' , [ '$location' , '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $location, $scope, Categories, Services, Users, Reservations )
		{	
			$scope.init = function()
			{
				$scope.page = 1;
				$scope.user         = MySession.get( 'user' )
				$scope.reservations = MySession.get( 'reservations' );
				$scope.count        = 0;
				$scope.total        = 0;
				for( var i in $scope.reservations ) {
					var hours = hoursBetween( new Date( $scope.reservations[ i ].start ) , new Date( $scope.reservations[ i ].end ) );
					var total = parseFloat( hours * ( $scope.reservations[ i ].price / 60 ) ).toFixed( 2 );
					var end   = moment( $scope.reservations[ i ].start ).add( 3, 'hours' ).format('DD/MM/YYYY HH:mm');
					var start = moment( $scope.reservations[ i ].end ).add( 3, 'hours' ).format('DD/MM/YYYY HH:mm');
					
					$scope.reservations[ i ].hours    = ( hours / 60 );
					$scope.reservations[ i ].total    = total;
					$scope.reservations[ i ].start    = end;
					$scope.reservations[ i ].end      = start;
					$scope.reservations[ i ].approved = true;
				};					
				
				$scope.updateTotals();
			};


			$scope.updateTotals = function () {
				$scope.total = 0;
				$scope.count = 0;
				$scope.reservations.forEach( function( reserve, index) {
					
					if( reserve.approved ) {
						$scope.total +=  parseFloat( reserve.total );
						$scope.count ++;
					}
				});
				
				$scope.total = '$ ' + $scope.total.toFixed(2);
			};

			$scope.goHome = function () {
				$location.path( '/' );
			};

			$scope.onPage = function ( page ) 
			{
				$scope.page = page;
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