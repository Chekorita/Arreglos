window.addEventListener('load', () => {

	let addedItems = [];

	// Funcion para cargar los escuchadores de eventos
	const loadEventListeners = () => {

		let cardItems = document.querySelectorAll('.item-card');

		cardItems.forEach((elem) => {

			let change = new Event('change');

			// Boton para restar cantidad al output
			let btnMin = elem.querySelector('.min-btn');
			// Output de la cantidad por item
			let output = elem.querySelector('.output');
			// Boton para sumar cantidad al output
			let btnPlus = elem.querySelector('.plus-btn');
			// Boton para añadir el producto al carrito
			let sendBtn = elem.querySelector('.add-btn');

			// Ajustar precio a los cambios del output
			output.addEventListener('change', (e) => {

				let priceContainer = elem.querySelector('.price-wraper > span');
				let originalPrice = priceContainer.getAttribute('title');

				priceContainer.textContent = `$${parseInt(originalPrice) * parseInt(output.value)} MX`;
			});
	
			// Disminuir la cantidad en el output
			btnMin.addEventListener('click', (e) => {
				if(output.value > 1) {
					output.value--;
					output.dispatchEvent(change);
				}
			});

			// Aumentar la cantidad del output
			btnPlus.addEventListener('click', (e) => {
				if(output.value < 99) {
					output.value++;
					output.dispatchEvent(change);
				}
			});
		});
	}

	const loadItems = () => {

	}

	loadEventListeners();
});