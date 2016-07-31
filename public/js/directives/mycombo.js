(function () {

	'use strict';

 	angular.module('services').directive( 'mycombo', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mycombo.html' ,
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
										
						if(scope.model)
						{
							$('[value="'+ scope.model +'"]').attr( 'selected' , 'selected' ).change();
						}
					}, 50 );
			}
		};
	
	}]);

})();