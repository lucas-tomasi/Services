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
				height: '='
			},
			link: function ( scope, element, attributes, form ) {

				scope.form = form;

				setTimeout(
					function () {
						$(element).fullCalendar({
							header: {
								left: 'prev,next today',
								center: 'title',
								right: 'month,agendaWeek,agendaDay'
							},
							defaultDate: new Date(),
							selectable: true,
							selectHelper: true,
							select: function(start, end) {
								var eventData = {
									userid:   scope.user._id,
									username: scope.user.name,
									title: scope.user.name + ' (' + scope.user.email + ')',
									start: start,
									end: end,
									editable: true
								};
								scope.data.push( eventData );
								scope.$apply();
								$(element).fullCalendar('renderEvent', eventData, true); // stick? = true
								$(element).fullCalendar('unselect');
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