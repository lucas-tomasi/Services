(function(){

	'use strict';

	angular.module('services')

	.controller( 'CategoryController' , [ '$scope' , 'CategoriesServices' ,
		
		function( $scope , CategoriesServices ){
			
			$scope.init = function () {
				getCategory();
			};

			function getCategory() {

				CategoriesServices.getCategory().success( function( data ) {
					$scope.category = data;
				}).error( function (err) {
		 			$scope.category =  {};
				});
			}
			
			$scope.store = function () {
				
				CategoriesServices.storeCategory( $scope.category ).success( function ( data ) {
					Message.success( MyTranslate.get( 'SAVE' ) );
					$scope.category = data;							
				}).error( function ( data ) {
					var message = '';
					for(  var index in data.errors ){
						message = data.errors[index].message + "\n";
					}
					Message.error( message );
				});
			};

			$scope.init();
	}]);

})();