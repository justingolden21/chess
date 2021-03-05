$(()=> {
	let url = new URL(window.location.href);
	let pgn = decodeURI(url.searchParams.get('pgn'));
	if(pgn && game.load_pgn(pgn)) $('#link-btn').addClass('active');

	update(); // has to be called after loading url param
});

function updateUrlParam(pgn) {
	history.replaceState({}, '', '?pgn=' + encodeURI(pgn));
}