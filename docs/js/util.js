function openModal(title, body) {
	$('#modal-title').html(title);
	$('#modal-body').html(body);
	$('#modal').css('display', 'block');
}
function copyText(txt) {
	let tmp = $('<input type="text">').appendTo(document.body);
	tmp.val(txt);
	tmp.select();
	document.execCommand('copy');
	tmp.remove();
}