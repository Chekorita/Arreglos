window.addEventListener('load', () => {

	// Lista de items
	let addedItems = [];

	// Funcion para cargar los escuchadores de eventos para los items
	const loadEventListeners = () => {

		let cardItems = document.querySelectorAll('.item-card');

		cardItems.forEach((elem) => {

			let change = new Event('change');
			let add = new Event('add');

			// Boton para restar cantidad al output
			let btnMin = elem.querySelector('.min-btn');
			// Output de la cantidad por item
			let output = elem.querySelector('.output');
			// Boton para sumar cantidad al output
			let btnPlus = elem.querySelector('.plus-btn');
			// Boton para añadir el producto al carrito
			let sendBtn = elem.querySelector('.add-btn');

			//Contenedor del precio
			let priceContainer = elem.querySelector('.price-wraper > span');
			
			// Ajustar precio a los cambios del output
			output.addEventListener('change', (e) => {

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

			// Añadir el objeto a la lista de compra
			sendBtn.addEventListener('click', (e) => {

				let shoppingCart = document.querySelector('.shopping');

				let productName = elem.querySelector('.title-wraper > span').textContent;
				let originalPrice = parseInt(priceContainer.getAttribute('title'));
				let mount = parseInt(output.value);

				addItems(productName, originalPrice, mount);

				priceContainer.textContent = `$${ originalPrice } MX`;
				output.value="1";

				shoppingCart.dispatchEvent(add);

				sendBtn.firstElementChild.textContent = "Added";

				console.log(addedItems);
				
				setTimeout(() => {
					sendBtn.firstElementChild.textContent = "Add"					
				}, 1000);
			});
		});
	}

	// Cargar items en su contenedor
	const loadItems = () => {
		getItems().then( (res) => {

			let navbar = document.querySelector('header.principal-header');
			let rowsContainer = document.querySelector('.rows-container');
			let loader = document.querySelector('.loader');

			let cardItems = res.map((data) => itemCardTemplate(data));

			loader.style.opacity = 0;

			setTimeout(() => {

				loader.parentNode.removeChild(loader);
				navbar.style.opacity = 100;
		
				setTimeout(() => {
					
					rowsContainer.innerHTML = cardItems.join("");
					rowsContainer.style.opacity = 100;		
					// Cargando escuchadores de evento
					loadEventListeners();
				},300);
			}, 500);
		});
	}

	// Cargando tarjetas de cada item
	loadItems();

	// Cargando evento a carrito de compra
	(() => {
		let shoppingCart = document.querySelector('.shopping');
		shoppingCart.addEventListener('add', (e) => {
			shoppingCart.firstElementChild.style.opacity = '100';
		});
	})();

	// Cargar evento para el boton del carro
	let shoppingBtn = document.querySelector('div.menu > div.shopping');
	let itemsContainer;

	shoppingBtn.addEventListener('click', (e) => {

		itemsContainer = document.querySelector('.container');
		document.querySelector('body').innerHTML = shoppingScreenTemplate();
		
		setTimeout(() => {

			let closeBtn = document.querySelector('.close-icon');
			let shoppingScreen = document.querySelector('.shopping-screen');

			closeBtn.addEventListener('click', (e) => {
				shoppingScreen.parentNode.removeChild(shoppingScreen);
				document.querySelector('body').appendChild(itemsContainer);
			});
		}, 100);
	});

	/* Funciones variadas */

	// Agregar o sumar a los items
	function addItems(productName, originalPrice, mount) {

		let index = -1;

		console.log(typeof mount)
		console.log("hola: " + originalPrice*mount);

		for(let i = 0; i < addedItems.length; i++) {
			if(addedItems[i].name === productName) {
				index = i;
			}
		}  

		console.log(index);

		if(index < 0) {
			let item = {
				name: productName,
				cost: originalPrice,
				amount: mount,
				total: originalPrice*mount 
			};

			addedItems.push(item);
		}
		else {
			addedItems[index].amount = addedItems[index].amount+mount;
			console.log("adios" + addedItems[index].cost*addedItems[index].amount);
			addedItems[index].total = addedItems[index].cost*addedItems[index].amount;
		}
	}

	// Funcion para recuperar objetos
	function getItems() {
		return fetch("/kids-party-items").then((res) => res.json());
	}

	// Función para retornar el costo del total a pagar
	function getTotal() {
		
		let allPricesInCart = addedItems.map( item => item.total );
		
		let total = allPricesInCart.reduce((prev, curr) => {
			return prev + curr;
		}, 0);

		return total;
	}

	/* Plantillas */

	// Plantilla de la tarjeta de los items
	function itemCardTemplate(data) {
		return `
			<div class="item-card">
				<div class="up-box height-50">
					<div class="image" style=" background-image: url('/${ data.src }') "></div>
				</div>
				<div class="below-box height-50 default-cursor">
					<div class="product-info">
						<div class="title-wraper flex-center">
							<span>${ data.name } ${ data.size }</span>
						</div>
						<div class="price-wraper flex-center">
							<span title="${ data.price }">$${ data.price } MX</span>
						</div>
					</div>
					<div class="buy-wraper">
						<div class="selector-wraper height-50 flex-center">
							<div class="selector">
								<div class="min-btn flex-center">-</div>
								<input type="text" name="lote" class="output" value="1">
								<div class="plus-btn flex-center">+</div>
							</div>
						</div>
						<div class="add-cart-wraper height-50">
							<div class="add-btn">
								<span>Add</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	// Plantilla de la pantalla de compra
	function shoppingScreenTemplate() {
		return `
			<div class="shopping-screen">
				<header class="shopping-screen">
					<div class="close-icon default-cursor">
						<span class="material-icons md-38 md-dark">clear</span>
					</div>
				</header>
				${
					addedItems.length === 0 ? nothingToBuyTemplate(): buyingBoardTemplate()
				}
			</div>
		`;
	}

	// Plantilla que se muestra si no hay items en el carrito
	function nothingToBuyTemplate() {
		return `
			<div class="sorry-screen flex-center">
				Lo sentimos, aun no hay nada en tu carrito :(
			</div>
		`;
	}

	// Plantilla que se muestra cuando hay items en el carrito
	function buyingBoardTemplate() {

		let addedCards = addedItems.map( item => boughtItemCard(item));

		return `
			<div class="table-wraper">
				<div class="table-container">${ addedCards.join("") }</div>
			</div>
			<div class="buy-wraper">
				<div class="total-wraper">
					<span>Total: $${ getTotal() }</span>
				</div>
				<div class="buy-btn-wraper">
					<div class="buy-btn">Comprar</div>
				</div>
			</div>
		`;
	}

	function boughtItemCard(item) {
		return `
			<div class="bought-card">
				<div class="">
					<div class="title-wraper flex-center">
						<span>${ item.name }</span>
					</div>
					<div class="price-wraper flex-center">
						<span>Total: $${ item.total } MX</span>
					</div>
				</div>
			</div>
		`;
	}

});
