(function () {

	'use strict';

 	angular.module('services').directive( 'mydate', [function () {
		
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mydate.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				required: '@',
				mask: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form  = form;
				scope.clear =  function ( el ) {
					scope.model = '';
					
				};
			}
		};
	
	}]);

})();