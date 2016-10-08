(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReportStatistcsController' , [ '$scope' , 'ServicesServices' , 'ReservationsServices' ,
		
		function( $scope, Services, Reservations ) {
			
			$scope.init = function() {
				getServicesCategoriesDrilldown();				
			};

			function getReserationsServicesDrilldown()
			{
				Reservations.getReserationsServicesDrilldown().success( function( data ){
					$scope.reservationsServices = data;
					getStatusReservationsDrilldown();
				});
			}

			function getServicesCategoriesDrilldown( ) {
				Services.getServicesCategoriesDrilldown().success( function( data ){
					$scope.servicesCategories = data;
					getReserationsServicesDrilldown();
				});			
			}

			function getStatusReservationsDrilldown()
			{
				Reservations.getStatusReservationsDrilldown().success( function( data){
					$scope.statusReservations = data;
					loadDrilldown();
				});
			}

			function loadDrilldown()
			{
				$scope.drilldown = [];
				var reservesServices = new Set();
				angular.forEach( $scope.servicesCategories, function( category , i ) {
					var data = [];
					angular.forEach( $scope.reservationsServices, function( reserve , i){
						if( category.drilldown == reserve.id ) {
							reservesServices.add( { id: reserve.drilldown, name: reserve.name } );
							data.push( { name: reserve.name, y: reserve.y, drilldown: reserve.drilldown, color: reserve.color } );
						}
					});
					$scope.drilldown.push( { id: category.drilldown, color: category.color, name: category.name, data: data } );
				});
				
				angular.forEach( reservesServices , function( service , i ){
					var data = [];
					angular.forEach( $scope.statusReservations, function( state, i){
						if( service.id == state.id ) {
							data.push( { name: state.name, y: state.y, color: state.color } );
						}
					});					
					$scope.drilldown.push( { id: service.id, name: service.name, data: data } );
				});

				loadChart();
			}

			// categories count(services) ->  services count(reserves) -> reserves count(status)
		  	function loadChart()
		  	{
	            Highcharts.setOptions( { lang: { drillUpText: '◁ Voltar para {series.name}' } } );
		      	
		        $('#container').highcharts(
		        {
		            chart: { type: 'column', backgroundColor: '#ECEFF1' },

		            title: { text: 'Reservations Statistics' , style: { fontWeight: 'bold', color: "#459c50" } },

		            // subtitle: { text: 'Reservations', style: { color: "#459c50" }  },

		            xAxis: [ { type: 'category' } ],

		            yAxis: [ { title: { text: 'Quantity', style: { fontWeight: 'bold', color: "#459c50" } } } ],

		            legend: { enabled: false },

		            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true, format: '{point.y:.0f}' } } },

		            tooltip: { headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
		                       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' +'</b><br/>' },

		            series: [{ 
		                    name: 'Categories', colorByPoint: true,
		                    data: $scope.servicesCategories 
		            } ],
		            
		            drilldown: {
		            	series: $scope.drilldown
		            },
		            
		            credits: [ { enabled: false } ]
		        } );
		  	};

		  	$scope.init();
	}]);

})();