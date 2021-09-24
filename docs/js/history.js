let historyList = [];

function loadHistory() {
	const h = localStorage.getItem('historyList');
	historyList = h ? h.split(',') : [];
	displayHistory();
}

function updateHistory() {
	localStorage.setItem('historyList', historyList);
}

function clearHistory() {
	historyList = [];
	updateHistory();
	displayHistory();
}

function addHistory(pgn) {
	historyList.push(pgn);
	updateHistory();
	displayHistory();
}

function displayHistory() {
	$('#history-list').html(
		historyList
			.map((pgn, idx) => 'Game' + (idx + 1) + ':<br> ' + pgn)
			.join('<br>')
	);
}
