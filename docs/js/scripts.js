let board = null;
let game = new Chess();

window.onload = ()=> {

	$('#new-game-btn').click( ()=> {
		game = new Chess();
		update();
	});
	$('#undo-btn').click( ()=> {
		game.undo();
		update();
	});

	function onDragStart(source, piece, position, orientation) {
		// do not pick up pieces if game is over or not current player's piece
		if(game.game_over() || piece[0] != game.turn()) return false;
	}

	function onDrop(source, target) {
		removeGreySquares();

		// see if the move is legal
		let move = game.move({
			from: source,
			to: target,
			promotion: 'q' // NOTE: always promote to a queen for example simplicity
		});

		// illegal move
		if(move === null) return 'snapback';
	}

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	function onSnapEnd() {
		update();
	}

	function update() {
		// todo: add rotate setting toggle, default false
		// board.orientation(game.turn()=='b'?'black':'white');
		board.position(game.fen());

		if(game.game_over()) {
			console.log('oh no'); // TODO
		}

		$('#fen').html(game.fen());
		$('#pgn').html(game.pgn());
		$('#history').val(game.history());
		$('#turn').html(game.turn()=='w'?'White':'Black');

		displayCapturedPieces();
	}

	board = Chessboard('board', {
		// showNotation: false, // TODO: setting
		draggable: true,
		position: 'start',
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd,
		onMouseoutSquare: onMouseoutSquare,
		onMouseoverSquare: onMouseoverSquare,
		pieceTheme: 'https://chessboardjs.com/img/chesspieces/alpha/{piece}.png',

		// todo: option for fun sandbox settings
		// dropOffBoard: 'trash',
		// sparePieces: true,
	});
	update();
}