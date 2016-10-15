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
				interval: '@',
				lang: "@"
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
							defaultView: 'agendaWeek',
							selectable: true,
							lang: scope.lang,
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
										Message.text( 'Please, write details the reserve' ,  function ( param ) 
										{
											var message = Util.scapeToHtml( param );
											var eventData = {
												ref_user:         scope.user._id,
												username:         scope.user.name,
												title:            scope.user.name + ' (' + scope.user.email + ')',
												start:            start,
												details:          message,
												end:              end,
												ref_service:      scope.service._id,
												servicename:      scope.service.title,
												professionalname: scope.service.professional.name,
												emailprofessional:scope.service.professional.email,
												emailuser:        scope.user.email,
												price:            scope.service.price,
												status:           'A',
												editable:         true
											};

											$rootScope.$emit( 'addReserve' , eventData );
											scope.model.push( eventData );
						
											scope.$apply();

											$(element).fullCalendar('renderEvent', eventData, true); // stick? = true
											$(element).fullCalendar('unselect');
										});
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