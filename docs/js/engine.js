const engine = new Worker('js/stockfish.js');
engine.onmessage = event => console.log(event.data);
engine.postMessage('position fen 8/5pkp/1p6/p7/P3p1B1/4p2P/5qPK/1R6 b - - 1 46');
engine.postMessage('go depth 10');