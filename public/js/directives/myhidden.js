(function () {

	'use strict';

 	angular.module('services').directive( 'myhidden', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/myhidden.html' ,
			scope : {
				name: '@',
				model: '='
			}
		};
	
	}]);

})();