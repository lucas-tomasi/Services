(function(){

	'use strict';

	angular.module('services')

	.controller( 'ReportStatistcsController' , [ '$scope' , 'ServicesServices' , 'ReservationsServices' ,
		
		function( $scope, Services, Reservations ) {
			
			$scope.init = function() {
				getReserationsServicesDrilldown();				
			};

			function getReserationsServicesDrilldown()
			{
				Reservations.getReserationsServicesDrilldown().success( function( data ){
					$scope.reservationsServices = data;
					var services = new Set();
					angular.forEach( data, function(obj){
						services.add( obj.drilldown );
					});
					getServicesCategoriesDrilldown( Array.from(services) );
				});
			}

			function getServicesCategoriesDrilldown( services ) {
				Services.getServicesCategoriesDrilldown( services ).success( function( data ){
					$scope.servicesCategories = data;
					getStatusReservationsDrilldown();
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

		  	function loadChart()
		  	{
	            Highcharts.setOptions( { lang: { drillUpText: '◁ '+ MyTranslate.get( 'BACK_TO' )  +' {series.name}' } } );
		      	
		        $('#container').highcharts(
		        {
		            chart: { type: 'column', backgroundColor: '#ECEFF1' },

		            title: { text: '<br>' + MyTranslate.get( 'STATISTICS' )  , style: { fontWeight: 'bold', color: "#459c50" } },

		            xAxis: [ { type: MyTranslate.get('CATEGORY') } ],

		            yAxis: [ { title: { text: MyTranslate.get( 'QUANT' ), style: { fontWeight: 'bold', color: "#459c50" } } } ],

		            legend: { enabled: false },

		            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true, format: '{point.y:.0f}' } } },

		            tooltip: { headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
		                       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' +'</b><br/>' },

		            series: [{ 
		                    name: MyTranslate.get( 'CATEGORIES' ), colorByPoint: true,
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