(function(){

	'use strict';

	angular.module('services')

	.controller( 'CategoriesController' , [ '$scope' , 'CategoriesServices' ,

		function( $scope, CategoriesServices )
		{			
			$scope.init = function() {
				$scope.columns = [
					{ title: MyTranslate.get('CODE')   , type: 'code'       , key: '_id'   , id: '_id' },
					{ title: MyTranslate.get('NAME')   , type: 'link'       , key: 'name'  , id: '_id' },
					{ title: MyTranslate.get('ACTIVE') , type: 'check'      , key: 'active', id: '_id' },
					{ title: ''       , type: 'btn-delete' , key: ''      , id: '_id' }
				];

				getCategories();
			
				$scope.delete = function ( id ) {
					CategoriesServices.deleteCategory( id ).success( function ( data ) {
						getCategories();
						Message.success( MyTranslate.get("DELETED") );
					});
				};
			};			

			function getCategories() {

				CategoriesServices.getCategories().success( function( data ) {
						$scope.categories = data;
				}).error( function (status) {
			 			$scope.categories =  [];
				});
			}

			$scope.init();				
	}]);

})();