(function () {

	'use strict';

 	angular.module('services').directive( 'mycalendar', [function () {
	
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
							timezone: 'local',
							defaultDate: new Date(),
							selectable: true,
							selectHelper: true,
							select: function(start, end) {
								
								if( start._d < moment().add( interval ,'d')._d )
								{
									Message.alert('Select a larger date ' + moment( moment().add( interval ,'d')._d ).format('DD MMMM YYYY HH:mm:ss') );
								}
								else
								{
									if( scope.user )
									{
										var eventData = {
											userid:   scope.user._id,
											username: scope.user.name,
											title:    scope.user.name + ' (' + scope.user.email + ')',
											start:    start,
											end:      end,
											editable: true
										};
										scope.data.push( eventData );
										scope.$apply();
										$(element).fullCalendar('renderEvent', eventData, true); // stick? = true
										$(element).fullCalendar('unselect');
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
							        Message.confirm( 'confirms exclusion?' , function() {
							        	e.remove();
							        	scope.data = scope.data.filter( function (a) {
							        		return a.start.toString() != calEvent.start.toString() && 
							        			   a.end.toString()   != calEvent.end.toString()   &&
							        			   a.userid           != calEvent.userid         ;
							        	});

							        	scope.$apply();
										$(element).fullCalendar('removeEvents', [calEvent._id]);
						        	});
							    }
						    }
						});
				}, 300 );
			}
		};
	
	}]);

})();