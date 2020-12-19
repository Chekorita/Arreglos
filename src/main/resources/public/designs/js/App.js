const main = () => {

	let header = document.querySelector('header.wallpaper');
	let cardContainer = document.querySelector('.card-container');

	getEvents().then(result => {

		let elements = result.map((event) => cardTemplate(event));
		
		document.querySelector('.loader').style.opacity = '0';
		
		setTimeout(() => {

			document.querySelector('.loader').style.display = 'none'
			header.style.opacity = 100;
			cardContainer.innerHTML = elements.join("");
			cardContainer.style.opacity = 100;

			document.title = "Designs";

			setTimeout(() => {

				let eventCards = document.querySelectorAll('.card > div.sunglass');

				eventCards.forEach( eventCard => {
					eventCard.addEventListener('click', (e) => {
						let ref = e.target.firstElementChild.firstElementChild.firstElementChild.attributes.href;
						window.location.href = ref.value;
					});
				});
			}, 200);
		}, 355);
	})

	/* Funciones para consumir api */
	function getEvents() {
		return fetch("/events").
		then(res => res.json());
	}

	/*Plantillas haciendo uso de lo retornado por la coleccion de Eventos*/
	function cardTemplate (data) {

		let side = data.position%2 === 0 ? "right": "left";

		return `
			<div class="card wallpaper" style="background-image: url('${ data.src }')">
				<div class="sunglass ${ side }">
					<div class="${ side === 'left' ? 'margin-left': 'margin-right' }">
						<span>
							<a class="text normal-font default-cursor" href="${data.ref}">${ data.text }</a>
						</span>
					</div>
				</div>
			</div>
		`;
	}
}

window.addEventListener('load', main);