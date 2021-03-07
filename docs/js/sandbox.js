$(()=> {
	function updateFen() {
		$('#sandbox-fen').val(sandboxBoard.fen());
	}

	let sandboxBoard = Chessboard('sandbox-board', {
		draggable: true,
		dropOffBoard: 'trash',
		sparePieces: true,
		pieceTheme: 'img/pieces/{piece}.svg',
		position: 'start',
		onSnapEnd: updateFen,
	});

	updateFen();

	$('#sandbox-start-btn').click(sandboxBoard.start);
	$('#sandbox-clear-btn').click(sandboxBoard.clear);

	$('#sandbox-load-btn').click(()=> {
		let fenpgn = $('#sandbox-load-input').val();
		sandboxBoard.position(fenpgn);
	});
	$('#sandbox-load-input').keydown(e=> { if(e.which==13) $('#sandbox-load-btn').click(); /* on enter*/ });

	$('#copy-sandbox-fen').click(()=> {
		$('#sandbox-fen').select();
		document.execCommand('copy');
		showSnackbar('Copied FEN');
	});

	// note: loads with notation on. can call $('#notation-toggle').change();
	// after setting up sandboxBoard if want to default to off per checkbox state

});