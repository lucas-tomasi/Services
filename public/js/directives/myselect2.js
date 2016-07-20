(function () {

	'use strict';

 	angular.module('services').directive( 'myselect2', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/myselect2.html' ,
			scope : {
				data: '=',
				label: '@',
				name: '@',
				model: '=',
				required: '@',
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
				
				$('select').select2({
					data: scope.data,
					placeholder: "Select a value",
					allowClear: true,
					minimumInputLength: 2
				});
				
			}
		};
	
	}]);

})();