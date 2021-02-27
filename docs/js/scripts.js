// https://chessboardjs.com/examples#5001
window.onload = ()=> {
	let board = null;
	let game = new Chess();

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

		$('#fen').val(game.fen());
		$('#pgn').val(game.pgn());
		$('#history').val(game.history());
		$('#turn').html(game.turn()=='w'?'White':'Black');

		// given FEN string, display captured pieces
		let pieces = game.fen().split(' ')[0].replace(/[\/,0-9]/g, '');
		let capturedPieces = 'rnbqkbnrppppppppPPPPPPPPRNBQKBNR'.split('');
		$('#captured-pieces').html('');
		for(let piece of pieces) {
			let idx = capturedPieces.indexOf(piece);
			console.log(idx);
			capturedPieces.splice(idx, 1);
		}
		const isUppercase = c => c == c.toUpperCase();
		for(let piece of capturedPieces) {
			let str = (isUppercase(piece) ? 'w' : 'b') + piece.toUpperCase();
			$('#captured-pieces').append(`<img class="captured-piece" src="https://chessboardjs.com/img/chesspieces/alpha/${str}.png">`);
		}
	}

	// -------- hover possible moves --------


	let whiteSquareGrey = '#a9a9a9';
	let blackSquareGrey = '#696969';

	function removeGreySquares() {
		$('#board .square-55d63').css('background', '');
	}

	function greySquare(square) {
		let $square = $('#board .square-' + square);
		$square.css('background', $square.hasClass('black-3c85d') ? blackSquareGrey : whiteSquareGrey);
	}


	function onMouseoverSquare(square, piece) {
		// get list of possible moves for this square
		let moves = game.moves({
			square: square,
			verbose: true
		});

		// exit if there are no moves available for this square
		if (moves.length === 0) return;

		// highlight the square they moused over
		greySquare(square);

		// highlight the possible squares for this piece
		for(let i = 0; i < moves.length; i++) {
			greySquare(moves[i].to);
		}
	}

	function onMouseoutSquare(square, piece) {
		removeGreySquares();
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