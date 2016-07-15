(function () {

	'use strict';

 	angular.module('services').directive( 'mypanel', [function () {
		return {
			restrict: 'E',
			templateUrl: '/js/directives/templates/mypanel.html' ,
			transclude: {
				'bodySlot'  : '?mypanelbody',
				'footerSlot': '?mypanelfooter'
			},
			scope: {
			 	title: '@'
			}
		};
	}]);
})();

