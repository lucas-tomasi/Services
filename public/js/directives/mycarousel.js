(function () {

	'use strict';

 	angular.module('services').directive( 'mycarousel', [function () {
	
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/js/directives/templates/mycarousel.html' ,
			scope : {
				data:   '=' , // { image: ... , text: ... ,  }
				height: '@' ,
				width:  '@'
			},
			link: function ( scope, element, attributes ) {
				
				scope.next = function () {	
					$(element).carousel('next');
				};

				scope.prev = function () {
					$(element).carousel('prev');
				};

				scope.goTo = function ( number ) {
					$(element).carousel( number );
				};

				$(element).carousel({
					interval: 5000
				});

				setTimeout( function () {
					$(element).carousel(0);
				}, 0 );
			}
		};
	
	}]);

})();