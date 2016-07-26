(function () {

	'use strict';

 	angular.module('services').directive( 'mycheckbox', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mycheckbox.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '='
			},
			link: function( scope, element, attributes , form ) {
				 scope.form = form;
			}
		};
	
	}]);

})();