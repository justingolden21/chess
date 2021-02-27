// https://chessboardjs.com/examples/5002
window.onload = ()=> {

	let board = null;
	let game = new Chess();

	function makeRandomMove() {
		let possibleMoves = game.moves()

		if (game.game_over()) return;

		let randomIdx = Math.floor(Math.random() * possibleMoves.length);
		game.move(possibleMoves[randomIdx]);
		board.position(game.fen());

		window.setTimeout(makeRandomMove, 500);
	}

	board = Chessboard('board', 'start');

	window.setTimeout(makeRandomMove, 500);
}