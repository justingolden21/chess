let snackbarTimeout;

function showSnackbar(txt, ms = 2000) {
	let s = $('#snackbar').text(txt).addClass('show');
	clearTimeout(snackbarTimeout);
	snackbarTimeout = setTimeout(() => s.removeClass('show'), ms);
}
