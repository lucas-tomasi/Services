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
				required: '@'
			},
			link: function ( scope, element, attributes, form ) {
				scope.form = form;
				setTimeout( function () {
						if(scope.model) {
							var id = (scope.model._id)? scope.model._id : scope.model;
							$('[value="'+ id +'"]').attr( 'selected' , 'selected' ).change();
						}
				}, 150 );
			}
		};
	
	}]);

})();