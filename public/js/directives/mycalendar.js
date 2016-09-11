(function () {

	'use strict';

 	angular.module('services').directive( 'mycalendar', [ '$rootScope' , function ( $rootScope ) {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/js/directives/templates/mycalendar.html' ,
			scope : {
				data: '=',
				user: '=',
				name: '@',
				model: '=',
				width: '=',
				height: '=',
				service: '=',
				interval: '@'
			},
			link: function ( scope, element, attributes, form ) {

				scope.form = form;

				var interval = ( scope.interval )? scope.interval : 2 ;

				setTimeout(
					function () {
						$(element).fullCalendar({
							header: {
								left: 'prev,next today',
								center: 'title',
								right: 'month,agendaWeek,agendaDay'
							},
							timezone: 'UTC-03:00',
							defaultDate: new Date(),
							selectable: true,
							selectHelper: true,
							select: function(start, end) {
								
								if( start < moment().add( interval ,'d') )
								{
									Message.alert('Select a larger date ' + moment( moment().add( interval ,'d')._d ).format('DD MMMM YYYY HH:mm:ss') );
								}
								else
								{
									if( scope.user )
									{
										var saveReserve = function ( param ) 
										{
											var message = param.replace( /\r\n|\r|\n/g	, "<br>" );
											var eventData = {
												userid:           scope.user._id,
												username:         scope.user.name,
												title:            scope.user.name + ' (' + scope.user.email + ')',
												start:            start,
												message:          message,
												end:              end,
												service:          scope.service._id,
												servicename:      scope.service.title,
												professionalname: scope.service.professional.name,
												price:            scope.service.price,
												editable:         true
											};

											scope.model.push( eventData );
						
											$rootScope.$broadcast( 'addReserve' , eventData );
						
											scope.$apply();

											$(element).fullCalendar('renderEvent', eventData, true); // stick? = true
											$(element).fullCalendar('unselect');
										};

										Message.text( 'Please, write a message for professional' , saveReserve );
									}
									else
									{
										Message.alert(  'Please login' );
									}
								}
							},
							eventBorderColor: '#459c50',
							eventBackgroundColor: 'white',
							editable: true,
							events: scope.data,
							eventClick: function(calEvent, jsEvent, view) {
								var e = $(this);
								console.log( calEvent );
								console.log( jsEvent );
								console.log( view );
						        if( calEvent.editable )
						        {
						        	var message = calEvent.message + "\n" + calEvent.start.format('DD/MM/YYYY HH:mm') + " at " + calEvent.end.format('DD/MM/YYYY HH:mm');
							        Message.question( message , function() {
							        
							        	e.remove();
							        	
							        	$rootScope.$broadcast( 'removeReserve' , calEvent );

							        	scope.data = scope.data.filter( function (a) {
							        		return a.start  != calEvent.start && 
								        		   a.end    != calEvent.end   &&
								        		   a.userid != calEvent.userid           &&
								        		   a.service!= calEvent.service;
							        	} );

							        	scope.$apply();
										$(element).fullCalendar( 'removeEvents', [calEvent._id]);
						        	}, calEvent.username , 'Delete');
							    }
						    }
						});
				}, 300 );
			}
		};
	
	}]);

})();