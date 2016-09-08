
(function(){

	'use strict';

	angular.module('services')

	.controller( 'ConfirmReserveController' , [ '$scope' , 'CategoriesServices' , 'ServicesServices' , 'UsersServices', 'ReservationsServices' ,

		function( $scope, Categories, Services, Users, Reservations )
		{	
			$scope.init = function()
			{
				$scope.service = {};
				$scope.page = 1;
				// $scope.user             = $cookies.get( 'user' )
				// $scope.reservations     = $cookies.get( 'reservations' );
				// $scope.service._id      = $cookies.get( 'service' );
				// $scope.service.name     = $cookies.get( 'servicename' );
				// $scope.professionalname = $cookies.get( 'professionalname' );
				// $scope.service.price    = $cookies.get( 'price' );

				for( var i in  $scope.reservations )
				{
					$scope.reservations[i].price        = (( hoursBetween( new Date($scope.reservations[i].start) , new Date($scope.reservations[i].end) ) * $scope.service.price )/ 60 ).toFixed(2);
					$scope.reservations[i].professional = $scope.professionalname;
				}
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