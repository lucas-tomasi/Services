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
				
				setTimeout(
					function () {
						var myselect = $(element).find('select');
						
						myselect.select2({
							data: scope.data,
							placeholder: "Select a value",
							allowClear: true,
							minimumInputLength: 2
						});
				
						if(scope.model)
						{
							$('[value="'+ scope.model +'"]').attr( 'selected' , 'selected' ).change();
						}
					}, 700 );
			}
		};
	
	}]);

})();