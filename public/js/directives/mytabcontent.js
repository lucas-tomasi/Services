(function () {

	'use strict';

 	angular.module('services').directive( 'mytabcontent', [function () {
		return {
	      require: '^mytabs',
	      restrict: 'E',
	      transclude: true,
	      scope: { title: '@' },
	      link: function(scope, element, attrs, tabsCtrl) {
	        tabsCtrl.addPane(scope);
	      },
	      templateUrl: 'js/directives/templates/mytabcontent.html',
	      replace: true
	    };
	}]);
})();

