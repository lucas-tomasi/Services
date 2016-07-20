(function () {

	'use strict';

 	angular.module('services').directive( 'myform', [function () {
	
		return {
			restrict: 'E',
			templateUrl: '/js/directives/templates/myform.html' ,
			transclude: true,
			scope: {
				formname: '@',
				funcsubmit: '&'
			}
		};
	
	}]);

})();