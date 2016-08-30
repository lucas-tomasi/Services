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
				
				if ( scope.data.description.length > 223 )
				{
					scope.data.description = scope.data.description.substr(0,220) + '...';	
				}

				scope.data.price = scope.data.price.toFixed(2);

			}
		};
	
	}]);

})();