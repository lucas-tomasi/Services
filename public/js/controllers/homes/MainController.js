(function(){

	'use strict';

	angular.module('services')

	.controller( 'MainController' , [ '$rootScope' , '$scope' , '$translate',

		function( $rootScope, $scope, $translate )
		{	
			$scope.init = function () {
				$scope.qtde = ( MySession.get('reservations') )? MySession.get('reservations').length : null;
				$scope.lang  = MySession.get('language');
			};

			$scope.changeLanguage = function( lang ) {
				$scope.lang  = lang;	
				MySession.set( 'language' , lang );
				$translate.use( lang );
			};


			$rootScope.$on( 'onLoad' , function (event , load ) {
				$scope.load = load;	 
			});

			$rootScope.$on( 'addReserve'    , function (event, reserve ) 
			{
				var reservations = ( MySession.get( 'reservations' ) )? MySession.get( 'reservations' ) : [] ;

				reservations.push( reserve );

				MySession.set( 'reservations' , reservations );
				
				$scope.qtde = ( reservations )? reservations.length : null; 			
			});

			$rootScope.$on( 'clearReservations' , function ( event, obj ) {		
  				MySession.remove('reservations');		
  				$scope.qtde = null;		
  			});

			$rootScope.$on( 'removeReserve' , function ( event, reserve ) {
				var reservations = MySession.get( 'reservations' );				

				reservations = reservations.filter( function ( value ) {
					return value.service != reserve.service && value.start != reserve.start && value.end != reserve.end;
				});

				MySession.set( 'reservations' , reservations );
				$scope.qtde = ( reservations )? reservations.length : null; 
				
			});

			$scope.init();

		}]);

})();