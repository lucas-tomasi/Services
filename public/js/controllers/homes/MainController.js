(function(){

	'use strict';

	angular.module('services')

	.controller( 'MainController' , [ '$rootScope' , '$scope' ,

		function( $rootScope, $scope )
		{	
			$scope.init = function () 
			{
				$scope.qtde = ( MySession.get('reservations') )? MySession.get('reservations').length : null;
			}


			$rootScope.$on( 'addReserve'    , function (event, reserve ) 
			{
				var reservations = ( MySession.get( 'reservations' ) )? MySession.get( 'reservations' ) : [] ;

				reservations.push( reserve );

				MySession.set( 'reservations' , reservations );
				
				$scope.qtde = ( reservations )? reservations.length : null; 			
			});

			$rootScope.$on( 'removeReserve' , function ( event, reserve ) {
				console.log('ssss');
				var reservations = MySession.get( 'reservations' );				

				reservations = reservations.filter( function ( value ) {
					console.log( (value.service != reserve.service && value.start != reserve.start && value.end != reserve.end) );
					return value.service != reserve.service && value.start != reserve.start && value.end != reserve.end;
				});

				MySession.set( 'reservations' , reservations );
				$scope.qtde = ( reservations )? reservations.length : null; 
				
			});

			$scope.init();

		}]);

})();