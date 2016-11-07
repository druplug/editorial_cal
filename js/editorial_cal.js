(function ($) {
    Drupal.behaviors.editorialCal = {
	attach: function (context, settings) {
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
                eventClick:  function(event, jsEvent, view) {
                    $('#modalTitle').html(event.title);
                    $('#modalBody').html(event.description);
                    $('#eventUrl').attr('href',event.url);
                    $('#fullCalModal').modal();
                    return false;
                },
		events: {
		    url: 'https://gist.githubusercontent.com/badri/efd6492ecb436bee19cd1aeec84188a7/raw/62812734d2b05e1239fcbca39fcb317cc6c770cc/events.json',
		    color: 'yellow',
		    textColor: 'black',
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
