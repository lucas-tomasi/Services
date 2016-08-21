(function () {

	'use strict';

 	angular.module('services').directive( 'mymask', [function () {
		return {
	      restrict: 'A',	
	      replace: true,
	      require: 'ngModel',
	      scope: {
	      	mymask: '@'
	      },
	      link: function (scope, element, attributes, model ) {
			
			if( scope.mymask.indexOf('number_format') >= 0 )
			{	      	
   				element.css('text-align','right');
   			}

	      	var _format = function( value )
	      	{
	      		if( value )
	      		{
			      	var newValue = '';
			      	//format == numer_format( dec , sep_d , sep_t ) ("2",",",".")
		      		if( scope.mymask.indexOf('number_format') >= 0 )
		      		{
		      			var mask      = scope.mymask.split('"');
		      			var arrayMask = (mask.length == 1)? scope.mymask.split("'") : mask;

		      			var dec   = arrayMask[1];
		      			var sep_d = arrayMask[3];
		      			var sep_t = arrayMask[5];
		     			
		      			newValue =  value.replace(/[^\d]/g, '').replace(/\./g, '').replace(/\,/g , '');
		     			
		     			if( newValue.length > dec )
		     			{
		     				newValue = newValue.substr( 0 , newValue.length - dec ) + sep_d + newValue.substr( newValue.length - dec );
		     				newValue = newValue.replace(/\B(?=(?:\d{3})+(?!\d))/g, sep_t );		     				
		     			}
		      		}
		      		else
		      		{
			      		for (var i = 0; i < value.length; i++) 
			      		{
			      			var partialMask  = scope.mymask.substr(i,1);
			      			var partialValue = value.substr(i,1);
			      			
			      			if( partialMask === '#')
			      			{
								newValue += partialValue.replace(/[^0-9]/, "");
			      			}
			      			else
			      			{
			      				newValue += partialMask;
			      			}
			      		}
					}
	      		
	      			return newValue;
	      		}
	      		
	      		return '';
	      	}

	      	element.bind( 'keyup', function (evt) {
	      		if( scope.mymask !== '' )
	      		{
		      		model.$setViewValue( _format( model.$viewValue ) );
					model.$render();
	      		}
	      	});

	      }
	    };
	}]);

})();

