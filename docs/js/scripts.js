let board = null;
let game = new Chess();
let undoStack = [];

$(() => {
	$('#new-game-btn').click(() => {
		game = new Chess();
		update();
	});
	$('#undo-btn').click(() => {
		let history = game.history();
		if (history.length == 0) return;
		undoStack.push(history[history.length - 1]);
		game.undo();
		update();
	});
	$('#redo-btn').click(() => {
		game.move(undoStack.pop());
		update();
	});
	$('#link-btn').click(() => {
		$('#link-btn').toggleClass('active');
		const active = $('#link-btn').hasClass('active');
		if (active) {
			updateUrlParam(game.pgn());
			copyText(window.location.href);
			showSnackbar('Copied link to game');
		} else {
			updateUrlParam('');
		}
	});
	$('#dark-btn').click(() => {
		$('#dark-btn').toggleClass('active');
		$('html').toggleClass('dark');
	});

	$('#rotate-toggle').change(() => {
		if ($('#rotate-toggle').is(':checked')) {
			board.orientation(game.turn() == 'b' ? 'black' : 'white');
		} else {
			board.orientation('white');
		}
		$('#notation-toggle').change();
	});
	$('#notation-toggle').change(() =>
		$('.white-1e1d7, .black-3c85d').css(
			'color',
			$('#notation-toggle').is(':checked') ? '' : 'transparent'
		)
	);

	$('#copy-fen').click(() => {
		$('#fen').select();
		document.execCommand('copy');
		showSnackbar('Copied FEN');
	});
	$('#copy-pgn').click(() => {
		$('#pgn').select();
		document.execCommand('copy');
		showSnackbar('Copied PGN');
	});

	$('#load-btn').click(() => {
		let fenpgn = $('#load-input').val();
		let success = false;
		if (!game.validate_fen(fenpgn).valid) {
			success = game.load_pgn(fenpgn);
		} else {
			success = game.load(fenpgn);
		}

		if (success) {
			update();
			$('#load-modal').css('display', 'none');
			$('#load-error-text').html('');
		} else {
			$('#load-error-text').html('Invalid FEN / PGN');
		}
	});
	$('#load-modal-btn').click(() =>
		setTimeout(() => $('#load-input').focus(), 50)
	);
	$('#load-input').keydown((e) => {
		if (e.which == 13) $('#load-btn').click(); /* enter*/
	});

	$(document).keydown((e) => {
		if (
			document.activeElement.tagName == 'INPUT' ||
			document.activeElement.tagName == 'TEXTAREA'
		)
			return;
		if (e.which == 37) $('#undo-btn').click();
		/* left */ else if (e.which == 39) $('#redo-btn').click(); /* right */
	});

	function onDragStart(source, piece, position, orientation) {
		// do not pick up pieces if game is over or not current player's piece
		if (game.game_over() || piece[0] != game.turn()) return false;
	}

	function onDrop(source, target) {
		removeGreySquares();

		// see if the move is legal
		let move = game.move({
			from: source,
			to: target,
			promotion: 'q', // test promotion, will undo and prompt if is promotion
		});

		if (move && move.promotion) {
			game.undo();
			openModal(
				'Promote a Pawn',
				'<button onclick="promote(\'' +
					source +
					"','" +
					target +
					"','n')\">Knight</button> <button onclick=\"promote('" +
					source +
					"','" +
					target +
					"','b')\">Bishop</button> <button onclick=\"promote('" +
					source +
					"','" +
					target +
					"','r')\">Rook</button> <button onclick=\"promote('" +
					source +
					"','" +
					target +
					"','q')\">Queen</button>"
			);
		}

		// illegal move
		if (move === null) return 'snapback';
	}

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	function onSnapEnd() {
		undoStack = [];
		update();
	}

	board = Chessboard('board', {
		draggable: true,
		position: 'start',
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd,
		onMouseoutSquare: onMouseoutSquare,
		onMouseoverSquare: onMouseoverSquare,
		pieceTheme: 'img/pieces/{piece}.svg',
	});

	$('#notation-toggle').change();
});

function update() {
	if ($('#rotate-toggle').is(':checked')) {
		board.orientation(game.turn() == 'b' ? 'black' : 'white');
	}
	board.position(game.fen());

	if (game.game_over()) {
		const state = game.in_checkmate()
			? (game.turn() == 'w' ? 'Black' : 'White') + ' wins by checkmate'
			: game.insufficient_material()
			? 'Draw - Insufficient Material'
			: game.in_threefold_repetition()
			? 'Draw - Threefold Repetition'
			: game.in_draw()
			? 'Draw - 50-Move Rule'
			: game.in_stalemate()
			? 'Draw - Stalemate'
			: 'Game Over';
		openModal('Game Over', state);
		$('#state').html(state);

		addHistory(game.pgn());
		displayHistory();
	} else {
		$('#state').html('');
	}

	$('#fen').val(game.fen());
	$('#pgn').val(game.pgn());
	$('#history').val(game.history().join('\n'));
	$('#turn').html(game.turn() == 'w' ? 'White' : 'Black');
	displayCapturedPieces();
	if ($('#link-btn').hasClass('active')) updateUrlParam(game.pgn());
}

function promote(source, target, promotion) {
	$('#modal').css('display', 'none');
	game.move({
		from: source,
		to: target,
		promotion: promotion,
	});
	update();
}
