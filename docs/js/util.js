function openModal(title, body) {
	$('#modal-title').html(title);
	$('#modal-body').html(body);
	$('#modal').css('display', 'block');
}