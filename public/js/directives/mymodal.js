(function () {

	'use strict';

 	angular.module('services').directive( 'mymodal', [function () {
		return {
			restrict: 'E',
			templateUrl: '/js/directives/templates/mymodal.html' ,
			transclude: {
				'bodySlot'  : '?mymodalbody',
				'footerSlot': '?mymodalfooter'
			},
			scope: {
			 	title: '@',
			 	name: '@',
			 	height: '@'
			},
			link: function( scope, element, attributes ) {
				scope.height = ( scope.height )? scope.height : 100;
			}

		};
	}]);
})();