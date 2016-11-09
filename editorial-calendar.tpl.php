<?php print $button; ?>

<div id="fullCalModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span> <span class="sr-only">close</span></button>
                <h4 id="modalTitle" class="modal-title"></h4>
            </div>
            <div id="modalBody" class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <a class="btn btn-primary" id="eventUrl" target="_blank">Event Page</a>
            </div>
        </div>
    </div>
</div>

<div class="calheader">
    <div id="monthcontext">
	<div class="leftarrow"></div>
	<div class="monthname"></div>
	<div class="rightarrow"></div>
	<div class="snaptoday">today</div>
    </div>
</div>
<div id="calendar">
</div>
