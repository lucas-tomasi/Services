
(function(){

	'use strict';

	angular.module('services')

	.controller( 'MyAccountController' , [ '$scope' , 'UsersServices' , 'CitiesServices' ,
		
		function( $scope , Users , Cities ){
			
			$scope.init = function () {
				getUser();
				getCities();
			};

			function getCities() {
	    		Cities.getCitiesComposite().success( function ( data ) {
		 			$scope.cities = data;
		 		}).error( function ( err ) {
		 			$scope.cities = []; 
		 		});
			}

			function getUser() {
				Users.getUserLogged().success( function( data ) {
					$scope.user = data;
				}).error( function (err) {
				 	$scope.user =  {};
				});
			}

			$scope.store = function() {
				User.saveAddress( $scope.user ).success( function( data ) {
					Message.success('');
				}).error( function( err ){
					Message.success('Error saving user');
				});
			};

			$scope.init();
	}]);

})();