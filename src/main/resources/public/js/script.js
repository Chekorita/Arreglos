const main = () => {
	
	let form = document.querySelector('.form');
	let btn = document.querySelector('.btn');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
	});

	btn.addEventListener('click', (e) => {

		let data = new URLSearchParams({
			email: document.querySelector('.email').value,
			password: document.querySelector('.pass').value
		});

		fetch('/data', {
			method: 'post',
			body: data
		})
		.then((res) => {
			console.log(res);
		});
	});
}

window.addEventListener('load', main);