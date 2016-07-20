(function(){

	'use strict';

	angular.module('services')

		.factory( 'CitiesServices' ,[ '$http' , '$routeParams' , function ( $http , $routeParams ) 
		{	
			var _getCities = function () 
			{
				return $http.get('/cities');
			};

			var _getCity = function () 
			{
				return $http.get('/city/' + $routeParams.id );
			};

			var  _getCitiesComposite = function()
			{
				return $http.get('/citiesComposite/');
			};

			return {	
				getCities: _getCities,
				getCity:   _getCity,
				getCitiesComposite: _getCitiesComposite
			};
		}]);
})();