
$(function() {
		$('#password').password().on('show.bs.password', function(e) {
		$('#methods').prop('checked', true);
	}).on('hide.bs.password', function(e) {
		$('#methods').prop('checked', false);
	});
		$('#methods').click(function() {
		$('#password').password('toggle');
	});
});

