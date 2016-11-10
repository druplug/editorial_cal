(function ($) {
    Drupal.behaviors.editorialCal = {
	attach: function (context, settings) {

	    var event_sources = [
		    {
			url: Drupal.settings.basePath + 'drafts/2',
			color: '#f1c40f',
			textColor: '#2c3e50',
		    },
		    {
			url: Drupal.settings.basePath + 'drafts/12',
			color: '#c0392b',
			textColor: '#fff',
		    }
	    ];
	    Drupal.ajax.prototype.commands.schedule_post_reload = function (ajax, data, status) {
		//location.reload();
		$('#calendar').fullCalendar('refetchEventSources', event_sources);
	    };

	    $('div.view-unscheduled-posts .fc-event').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
		    title: $.trim($(this).text()), // use the element's text as the event title
		    stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
		    zIndex: 9999,
		    revert: true,      // will cause the event to go back to its
		    revertDuration: 0  //  original position after the drag
		});

	    });

	    function get_calendar_height() {
		return $(window).height() - 63;
	    }

	    var currentYear = (new Date).getFullYear();
	    var currentMonth = (new Date).getMonth() + 1;
	    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }

	    $('#calendar').fullCalendar({
		height: get_calendar_height(),
		header: false,
		eventLimit: true,
		editable: true,
		droppable: true,
                eventClick:  function(event, jsEvent, view) {
                    $('#modalTitle').html(event.title);
                    $('#modalBody').html(event.description);
                    $('#eventUrl').attr('href',event.url);
                    $('#fullCalModal').modal();
                    return false;
                },
		dayClick:  function(date, jsEvent, view) {
		    console.log('Clicked on: ' + date.format());
		    var ajax = new Drupal.ajax('calendar', $('#calendar'), {
			event: 'editorial_cal_add',
			url: Drupal.settings.basePath + 'editorial_cal/nojs/add',
			submit: {
			    post_scheduled_date: date.format()
			}
		    });
		    $(ajax.element)
			.bind('editorial_cal_add', Drupal.CTools.Modal.clickAjaxLink)
			.trigger('editorial_cal_add');

		},
		eventDrop:  function( event, delta) {
		    console.log(event.nid + " was dropped on " + event.start.format());
		    var ajax = new Drupal.ajax('calendar', $('#calendar'), {
			event: 'editorial_cal_event_drop',
			url: Drupal.settings.basePath + 'editorial_cal/event_drop',
			submit: {
			    post_scheduled_date: event.start.format(),
			    post_id: event.nid
			}
		    });
		    $(ajax.element).trigger('editorial_cal_event_drop');
		},
		eventSources: event_sources
	    });

	    $(window).resize(function() {
		$('#calendar').fullCalendar('option', 'height', get_calendar_height());
	    });

	    var monthname = $('#calendar').fullCalendar('getView');
	    $('.monthname').html(monthname.title);

	    $('.leftarrow').click(function() {
		$('#calendar').fullCalendar('prev');
		var monthname = $('#calendar').fullCalendar('getView');
		$('.monthname').html(monthname.title);
	    });

	    $('.rightarrow').click(function() {
		$('#calendar').fullCalendar('next');
		var monthname = $('#calendar').fullCalendar('getView');
		$('.monthname').html(monthname.title);
	    });

	    $('.snaptoday').click(function() {
		$('#calendar').fullCalendar('today');
		$('.monthname').html(monthname.title);
	    });
	}
    };
}(jQuery));
