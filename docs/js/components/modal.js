window.addEventListener('load', ()=> {

	let modals = document.getElementsByClassName('modal');
	let modalBtns = document.getElementsByClassName('modal-btn');
	let closeBtns = document.getElementsByClassName('close');

	for(let modalBtn of modalBtns) {
		modalBtn.onclick = function(event) {
			event.preventDefault();
			document.querySelector(modalBtn.getAttribute('href')).style.display = 'block';
			console.log('hi');
		}
	}

	for(let closeBtn of closeBtns) {
		closeBtn.onclick = function(event) {
			closeBtn.parentNode.parentNode.parentNode.style.display = 'none';
			console.log('hi');
		}
	}

	window.onclick = function(event) {
		if(event.target.classList.contains('modal')) {
			for(let modal of modals) {
				if(typeof modal.style !== undefined) {
					modal.style.display = 'none';
				}
			}
		}
	}

	window.onkeydown = function(event) {
		if(event.key == 'Escape') {
			for(let modal of modals) {
				modal.style.display = 'none';
			}
		}
	}

});