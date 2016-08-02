(function () {

	'use strict';

 	angular.module('services').directive( 'mytextarea', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mytextarea.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				height: '=',
				required: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
			}
		};
	
	}]);

})();