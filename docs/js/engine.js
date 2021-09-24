const engine = new Worker('js/stockfish.js');

$(() => {
	engine.onmessage = (event) =>
		$('#engine-output').html(
			$('#engine-output').html() + '<br><br>' + event.data
		);

	$('button[href="#engine-modal"]').click(() => {
		// update with game fen when modal is opened
		$('#engine-fen-input').val(game.fen());
	});

	$('#engine-analysis-btn').click(() => {
		$('#engine-output').html('');
		const depth = validate('engine-depth-input', 10);
		const fen = $('#engine-fen-input').val();
		engine.postMessage('position fen ' + fen);
		engine.postMessage('go depth ' + depth);
		engine.postMessage('eval');
	});
});
