$(()=> {
	let sandboxBoard = Chessboard('sandbox-board', {
		draggable: true,
		dropOffBoard: 'trash',
		sparePieces: true,
		pieceTheme: 'img/pieces/{piece}.svg',
		position: 'start',
	});

	$('#sandbox-start-btn').click(sandboxBoard.start);
	$('#sandbox-clear-btn').click(sandboxBoard.clear);
});