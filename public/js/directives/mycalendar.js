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
									Message.alert( MyTranslate.get( 'DATE_LARGE' ) + " " + moment( moment().add( interval ,'d')._d ).format('DD MMMM YYYY HH:mm') );
								}
								else
								{
									if( scope.user )
									{
										Message.text( MyTranslate.get( 'DETAILS_RESERVE' ) ,  function ( param ) 
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
									} else {
										Message.alert(  MyTranslate.get( 'PLEASE_LOGIN' ) );
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
						        	var message = calEvent.start.format('DD/MM/YYYY HH:mm') + " "+ MyTranslate.get( 'AT' ) +" " + calEvent.end.format('DD/MM/YYYY HH:mm');
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
						        	}, calEvent.username , MyTranslate.get( 'DELETE' ) );
							    }
						    }
						});
				}, 300 );
			}
		};
	
	}]);

})();