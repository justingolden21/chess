let board = null;
let game = new Chess();

window.onload = ()=> {

	$('#new-game-btn').click(()=> {
		game = new Chess();
		update();
	});
	$('#undo-btn').click(()=> {
		game.undo();
		update();
	});

	$('#rotate-toggle').change(()=> {
		if($('#rotate-toggle').is(':checked')) {
			board.orientation(game.turn()=='b'?'black':'white');
		}
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
			promotion: 'q' // test promotion, will undo and prompt if is promotion
		});

		if(move && move.promotion) {
			game.undo();
			openModal('Promote a Pawn', '<button onclick="promote(\''+source+'\',\''+target+'\',\'n\')">Knight</button> <button onclick="promote(\''+source+'\',\''+target+'\',\'b\')">Bishop</button> <button onclick="promote(\''+source+'\',\''+target+'\',\'r\')">Rook</button> <button onclick="promote(\''+source+'\',\''+target+'\',\'q\')">Queen</button>');
		}

		// illegal move
		if(move === null) return 'snapback';
	}

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	function onSnapEnd() {
		update();
	}

	let config = {
		// showNotation: false, // TODO: setting
		draggable: true,
		position: 'start',
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd,
		onMouseoutSquare: onMouseoutSquare,
		onMouseoverSquare: onMouseoverSquare,
		pieceTheme: 'img/pieces/{piece}.svg',

		// todo: option for fun sandbox settings
		// dropOffBoard: 'trash',
		// sparePieces: true,
	};
	board = Chessboard('board', config);

	// testing:
	// game.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45');

	update();
}

function update() {
	if($('#rotate-toggle').is(':checked')) {
		board.orientation(game.turn()=='b'?'black':'white');
	}
	board.position(game.fen());

	if(game.game_over()) {
		const state = game.in_checkmate() ? (game.turn() == 'w' ? 'Black' : 'White') + ' wins by checkmate' : game.insufficient_material() ? 'Draw - Insufficient Material' : game.in_threefold_repetition() ? 'Draw - Threefold Repetition' : game.in_draw() ? 'Draw - 50-Move Rule' : game.in_stalemate() ? 'Draw - Stalemate' : 'Game Over';
		openModal('Game Over', state);
		$('#state').html(state);
	} else {
		$('#state').html('');
	}

	$('#fen').html(game.fen());
	$('#pgn').html(game.pgn());
	$('#history').val(game.history().join('\n'));
	$('#turn').html(game.turn()=='w'?'White':'Black');

	displayCapturedPieces();
}

function promote(source, target, promotion) {
	$('#modal').css('display','none');
	game.move({
		from: source,
		to: target,
		promotion: promotion
	});
	update();
}
