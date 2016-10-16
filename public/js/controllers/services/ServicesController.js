(function(){

	'use strict';

	angular.module('services')

	.controller( 'ServicesController' , [ '$scope' , 'ServicesServices' ,

		function( $scope, ServicesServices )
		{			
			$scope.init = function() {
				$scope.columns = [
					{ title: MyTranslate.get( 'CODE' )   , type: 'code'       , key: '_id'   , id: '_id' },
					{ title: MyTranslate.get( 'TITLE' )  , type: 'link'       , key: 'title' , id: '_id' },
					{ title: MyTranslate.get( 'PRICE' )  , type: 'link'       , key: 'price' , id: '_id' },
					{ title: MyTranslate.get( 'ACTIVE' ) , type: 'check'      , key: 'active', id: '_id' },
					{ title: ''                          , type: 'btn-delete' , key: ''      , id: '_id' }
				];

				getServices();
			};			
		
			$scope.delete = function ( id ) {
				ServicesServices.deleteService( id ).success( function ( data ) {
					getServices();
					Message.alert( MyTranslate.get( 'DELETED' ) );
				});
			};

			function getServices() {

				ServicesServices.getServices().success( function( data ) {
					$scope.services = data;
				}).error( function (status) {
		 			$scope.services =  [];
				});
			}

			$scope.init();				
	}]);

})();