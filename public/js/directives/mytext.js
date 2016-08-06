(function () {

	'use strict';

 	angular.module('services').directive( 'mytext', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mytext.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				minlength: '@',
				required: '@',
				readonly: '@',
				mask: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
			}
		};
	
	}]);

})();