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

function validate(name, defaultVal) {
	let elm = document.getElementById(name);
	let val = check(elm.value, elm.min, elm.max, defaultVal);
	elm.value = val;
	return val;
}
function check(num, min, max, defaultVal) {
	num = Math.max(Math.min(parseInt(num), max), min);
	return isNaN(num) ? defaultVal : num;
}
