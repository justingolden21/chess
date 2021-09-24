window.addEventListener('load', () => {
	const modals = document.getElementsByClassName('modal');
	const modalBtns = document.getElementsByClassName('modal-btn');
	const closeBtns = document.getElementsByClassName('close');

	for (let modalBtn of modalBtns) {
		modalBtn.onclick = function (event) {
			event.preventDefault();
			document.querySelector(
				modalBtn.getAttribute('href')
			).style.display = 'block';
		};
	}

	for (let closeBtn of closeBtns) {
		closeBtn.onclick = function (event) {
			closeBtn.parentNode.parentNode.parentNode.style.display = 'none';
		};
	}

	window.onclick = function (event) {
		if (event.target.classList.contains('modal')) {
			for (let modal of modals) {
				if (typeof modal.style !== undefined) {
					modal.style.display = 'none';
				}
			}
		}
	};

	window.onkeydown = function (event) {
		if (event.key == 'Escape') {
			for (let modal of modals) {
				modal.style.display = 'none';
			}
		}
	};
});
