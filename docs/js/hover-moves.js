const whiteSquareGrey = '#64748B'; // 500
const blackSquareGrey = '#1E293B'; // 800

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