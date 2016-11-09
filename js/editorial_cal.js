(function ($) {
    Drupal.behaviors.editorialCal = {
	attach: function (context, settings) {

	    Drupal.ajax.prototype.commands.schedule_post_reload = function (ajax, data, status) {
		location.reload();
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
		},
		eventDrop:  function( event, delta) {
		    console.log(event.title + " was dropped on " + event.start.format());
		},
		drop: function(date) {
		    $(this).remove();
		    console.log($(this).find('span.post-title').text() + " dropped on: " + date.format());
		},
		events: {
		    url: 'https://gist.githubusercontent.com/badri/efd6492ecb436bee19cd1aeec84188a7/raw/62812734d2b05e1239fcbca39fcb317cc6c770cc/events.json',
		    color: '#f1c40f',
		    textColor: '#2c3e50',
		},

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
