(function(){

	'use strict';

	angular.module('services')

	.controller( 'HomeController' , [ '$scope' , 'ServicesServices',

		function( $scope, Services )
		{			
			$scope.hidden = function()
			{
				$scope.hide = !$scope.hide;
			};
			$scope.init = function()
			{
				$scope.hide = false;
				getServices();
				$scope.filters = [ 
					{ id: 0 , order:'price*1'           , text: 'Max Price'    }, 
					{ id: 1 , order:'price*-1'          , text: 'Min Price'    }, 
					{ id: 2 , order:'stars*1'           , text: 'Max Star'     }, 
					{ id: 3 , order:'stars*-1'          , text: 'Min Star'     }, 
					{ id: 4 , order:'count_comments*1'  , text: 'Max comments' },
					{ id: 5 , order:'count_comments*-1' , text: 'Min comments' }, 	
				];
			};			

			function getServices () 
			{
				Services.getServicesPublic()
					.success(
						function ( data ) {
							$scope.services = data.map( function(item) {
								item.count_comments = item.comments.length;
								var count = 0;
								var stars = 0;
								item.comments.forEach( function( element ) {
									stars +=  parseInt( element.stars );
									count ++;
								});
								var stars = parseInt( (stars / count) ); 
								item.stars = (isNaN(stars))? 0: parseInt(stars); 
								return item;
							});
						})
					.error(
						function ( err ) {
							$scope.services = [];  
						});	 
			}

			function orderBy( type ){
				
			}

			$scope.init();				
	}]);

})();