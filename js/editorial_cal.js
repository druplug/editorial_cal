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
		events: [{
		    title: 'IT Meeting',
		    start: currentYear + '-' + currentMonth + '-01',
		},{
		    title: 'Lunch Catered by Jimmy Johns',
		    start: currentYear + '-' + currentMonth + '-26',
		},{
		    title: 'First Email Blast',
		    start: currentYear + '-' + currentMonth + '-18',
		},{
		    title: 'Adobe Conference',
		    start: currentYear + '-' + currentMonth + '-07',
		    end: currentYear + '-' + currentMonth + '-10',
		},{
		    title: 'Bob Long Visiting',
		    start: currentYear + '-' + currentMonth + '-29',
		    end: currentYear + '-' + currentMonth + '-31',
		},],

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
