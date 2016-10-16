(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServicesReportController' , [ '$scope' , 'UsersServices' , 'ReservationsServices' , 'CategoriesServices',
		
		function( $scope, Users, Reservations, Categories ) {
			
			$scope.init = function() {
				$scope.filter = {};
				getProfessionals();
				getCategories();
				$scope.states = Util.getStates();
			};

			function getProfessionals() {
				Users.getProfessionalsComposite().success( function( data ){
					$scope.professionals = data;
				});
			}

			function getCategories() {
				Categories.getCategoriesComposite().success( function( data ){
					$scope.categories = data;
				});
			}
			
			function prepareFilters() {
				for( var x in $scope.filter ) {
					if( $scope.filter[x] == null ){
						delete $scope.filter[x];
					}
				}
			}

			$scope.generate = function () {
				
				prepareFilters();

				Reservations.getReservationsReportServices( $scope.filter ).success( function ( data ) {
		 			$scope.services = data;
		 			Util.generateTable( 'tableServiceReports' , MyTranslate.get( 'REPORT_SERVICES' ) );
		 			
		 			$('.report-form').addClass('close-form');
		 			$('.report').addClass('open-form');

		 		}).error( function ( err ) {
		 			Message.error( "" );	
		 		});
			};

			$scope.back = function(){
				$('.report-form').removeClass('close-form');
		 		$('.report').removeClass('open-form');
			}	

			$scope.init();
	}]);

})();