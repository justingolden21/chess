$(()=> {
	let url = new URL(window.location.href);
	let pgn = decodeURI(url.searchParams.get('pgn'));
	let fen = decodeURI(url.searchParams.get('fen'));
	if(pgn && game.load_pgn(pgn)) $('#link-btn').addClass('active');
	else if(fen) game.load(fen);

	update(); // has to be called after loading url param
});

function updateUrlParam(str, isPGN=true) {
	history.replaceState({}, '', `?${isPGN?'pgn':'fen'}=` + encodeURI(str));
}