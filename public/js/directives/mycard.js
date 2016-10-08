(function () {

	'use strict';

 	angular.module('services').directive( 'mycard', [function () {
	
		return {
			restrict: 'E',
			templateUrl: '/js/directives/templates/mycard.html' ,
			scope : {
				data:   '=' // { image: ... , text: ... ,  }
			},
			link: function ( scope, element, attributes ) {

				scope.count = 0;

				if( scope.data.comments ) {
					var count = 0;
					var stars = 0;
					scope.data.comments.forEach( function( element, i ) {
						stars +=  parseInt( element.stars );
						count ++;
					});

					scope.stars = parseInt( (stars / count) );
					scope.count = count;
				}
			}
		};
	
	}]);

})();