(function(){

	'use strict';

	angular.module('services')

	.controller( 'UserController' , [ '$scope' , 'UsersServices' , 'CitiesServices' ,
		
		function( $scope , UsersServices , CitiesServices ){
			
			$scope.init = function () {
				getUser();
				getCities();
			};

			$scope.types = [ { id: 1 , text: 'User' } , { id: 2 , text: "Professional" } , { id: 3, text: "Admin" }  ];

			function getCities() 
			{

	    		CitiesServices.getCitiesComposite()

			 	.success(
			 		function ( data ) 
			 		{
			 			$scope.cities = data;
			 		})
			 	.error(
			 		function ( err ) 
			 		{
			 			$scope.cities = []; 
			 		});
			}

			function getUser() 
			{
				UsersServices.getUser()

					.success( 
				 		function( data ) 
				 		{
							$scope.user = data;
						})
					.error( 
						function (err) 
						{
				 			$scope.user =  {};
						});
			}
			

			$scope.store = function () {
				UsersServices.storeUser( $scope.user )
					.success(
						function ( data ) 
						{
							console.log(data);
							Message.success("User saved");
							$scope.user = data;							
						})
					.error(
						function ( data ) {
							var message = '';
							for(  var index in data.errors )
							{
								message = data.errors[index].message + '<br>';
							}

							Message.error( message );
						});
			};

			$scope.init();
	}]);

})();