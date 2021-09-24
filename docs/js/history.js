let historyList = [];

function addHistory(pgn) {
	historyList.push(pgn);
}

function displayHistory() {
	$('#history-list').html(
		historyList
			.map((pgn, idx) => 'Game' + (idx + 1) + ':<br> ' + pgn)
			.join('<br>')
	);
}
