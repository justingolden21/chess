// given FEN string, display captured pieces
function displayCapturedPieces() {
	let pieces = game.fen().split(' ')[0].replace(/[\/,0-9]/g, '');
	let capturedPieces = 'ppppppppnnbbrrqkPPPPPPPPNNBBRRQK'.split('');
	$('#captured-pieces').html('');
	for(let piece of pieces) {
		let idx = capturedPieces.indexOf(piece);
		capturedPieces.splice(idx, 1);
	}
	const isUppercase = c => c == c.toUpperCase();
	for(let piece of capturedPieces) {
		let str = (isUppercase(piece) ? 'w' : 'b') + piece.toUpperCase();
		$('#captured-pieces').append(`<img class="captured-piece" src="https://chessboardjs.com/img/chesspieces/alpha/${str}.png">`);
	}
}