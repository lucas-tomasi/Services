(function(){

	'use strict';

	angular.module('services')

	.controller( 'HomeController' , [ '$scope' , 'ServicesServices',

		function( $scope, Services ) {			
			
			$scope.hidden = function() {
				$scope.hide = !$scope.hide;
			};

			$scope.init = function() {
				$scope.hide = false;
				getServices();
				$scope.filters = [ 
					{ id: 0 , order:'price*1'           , text: MyTranslate.get( 'MAX_PRICE'   ) }, 
					{ id: 1 , order:'price*-1'          , text: MyTranslate.get( 'MIN_PRICE'   ) }, 
					{ id: 2 , order:'stars*1'           , text: MyTranslate.get( 'MAX_STARS'   ) }, 
					{ id: 3 , order:'stars*-1'          , text: MyTranslate.get( 'MIN_STARS'   ) }, 
					{ id: 4 , order:'count_comments*1'  , text: MyTranslate.get( 'MAX_REVIEWS' ) },
					{ id: 5 , order:'count_comments*-1' , text: MyTranslate.get( 'MIN_REVIEWS' ) }, 	
				];

				$scope.order = 2;
			};			

			function getServices () {
				
				Services.getServicesPublic().success( function ( data ) {
					
					$scope.services = data.map( function(item) {
						item.count_comments = item.comments.length;
						var count = 0, stars = 0;
						item.comments.forEach( function( element ) {
							stars +=  parseInt( element.stars );
							count ++;
						});
						var stars = parseInt( (stars / count) ); 
						item.stars = (isNaN(stars))? 0: parseInt(stars); 
						return item;
					});

				}).error( function ( err ) {
					$scope.services = [];  
				});	 
			};

			$scope.init();				
	}]);

})();