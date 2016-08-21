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
				
			}
		};
	
	}]);

})();