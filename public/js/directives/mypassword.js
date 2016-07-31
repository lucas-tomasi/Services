(function () {

	'use strict';

 	angular.module('services').directive( 'mypassword', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mypassword.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				required: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
			}
		};
	
	}]);

})();