(function () {

	'use strict';

	var _link = function (scope, iElement, iAttrs, iController, t ){

		scope.sort = function ( field ) {
			scope.sortkey = field;
			scope.reverse = !scope.reverse;
		};

		scope.onDelete = function ( obj ) {
			 obj.onDelete = !obj.onDelete;
		};
	};

 	angular.module('services').directive( 'mytable', [function () {
	
		return {
			restrict: 'E',
			templateUrl: '/js/directives/templates/mytable.html' ,
			transclude: {
				'headerSlot': '?mytablehead',
				'bodySlot'  : '?mytablebody'
			},
			scope : {
				items:    '=',
				columns:  '=',
				funcdel:  '&',
				linkform: '@'
			},
			link : _link
		};
	
	}]);

})();