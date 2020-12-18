window.addEventListener('load', () => {

	let carrousel = 1;

	// Lista de items
	let addedItems = [];

	// Información del usuario
	let userData = {};

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
				
				setTimeout(() => {
					sendBtn.firstElementChild.textContent = "Add"					
				}, 1000);
			});
		});
	}

	const loadShoppingScreenEvents = () => {

		let refresh = new Event('refresh');

		// Este es donde se muestra el precio en la pantalla de compra
		let totalContainer = document.querySelector('span.total');
		totalContainer.addEventListener('refresh', (e) => {
			totalContainer.textContent = getTotal();
		});
		
		// Boton para comprar
		let buyBtn = document.querySelector('.buy-btn');
		buyBtn.addEventListener('click', (e) => {
			loadNextAction();
	    });

		// Contenedor de las terjetas de los items añadidos al carrito
		let infoCards = document.querySelectorAll('div.bought-card');
		
		infoCards.forEach((item) => {

			// Boton de eliminar en la tarjeta
			let erase = item.querySelector('header');

			// Nombre del item en la tarjeta
			let nombre = item.querySelector('span.name').textContent;

			// Total de items en la tarjeta
			let totalAmount = item.querySelector('span.amount');
			
			// Costo total en la tarjeta
			let totalCost = item.querySelector('.item-total');

			// Disminuir la cantidad del item
			let minBtn = item.querySelector('.rm-btn');

			// Aumentar la cantidad del item
			let addBtn = item.querySelector('.sm-btn');
			
			// Actualizar el monto total en la tarjeta
			totalAmount.addEventListener('refresh', (e) => {

				let index;

				for(let n = 0; n < addedItems.length; n++) {
					if(addedItems[n].name === nombre) {
						index = n;
					}
				}

				totalAmount.textContent = addedItems[index].amount;
			});

			// Actulizar el precio del item en la tarjeta
			totalCost.addEventListener('refresh', (e) => {

				let index;

				for(let n = 0; n < addedItems.length; n++) {
					if(addedItems[n].name === nombre) {
						index = n;
					}
				}

				addedItems[index].total = addedItems[index].cost*addedItems[index].amount;
				totalCost.textContent = addedItems[index].total;
			});

			// Desplegar boton de eliminar
			item.addEventListener('mouseenter', (e) => {
				erase.style.height = "6vh";
			});

			// Ocultar boton de eliminar
			item.addEventListener('mouseleave', (e) => {
				erase.style.height = 0;
			});

			// Eliminar item cuando se hace click al boton de eliminar
			erase.addEventListener('click', (e) => {

				let index;
				
				item.parentNode.removeChild(item);

				for(let n = 0; n < addedItems.length; n++) {
					if(addedItems[n].name === nombre) {
						index = n;
					}
				}

				addedItems.splice(index, 1);
				totalContainer.dispatchEvent(refresh);

				if(parseInt(totalContainer.textContent) === 0) {
					document.querySelector('.result-container').innerHTML = nothingToBuyTemplate();
				}
			});

			minBtn.addEventListener('click', (e) => {

		    	if(parseInt(totalAmount.textContent) > 1) {
		    		let index;

					for(let n = 0; n < addedItems.length; n++) {
						if(addedItems[n].name === nombre) {
							index = n;
						}
					}

					addedItems[index].amount = addedItems[index].amount - 1;
					totalAmount.dispatchEvent(refresh);
					totalCost.dispatchEvent(refresh);
					totalContainer.dispatchEvent(refresh);
		    	}
			});

		    addBtn.addEventListener('click', (e) => {

				let index;

				for(let n = 0; n < addedItems.length; n++) {
					if(addedItems[n].name === nombre) {
						index = n;
					}
				}

				addedItems[index].amount = addedItems[index].amount + 1;
				totalAmount.dispatchEvent(refresh);
				totalCost.dispatchEvent(refresh);
				totalContainer.dispatchEvent(refresh);
		    });
		});
	}

	// Cargar items de la pantalla principal en su contenedor
	const loadItems = () => {
		getItems().then( (res) => {

			console.log(res);

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
		shoppingCart.addEventListener('remove', (e) => {
			shoppingCart.firstElementChild.style.opacity = '0';
		});
	})();

	// Cargando event listeners a menu slider
	(() => {
		let menuSlider = document.querySelector('.slider-container');
		let options = menuSlider.querySelector('.options');
		menuSlider.addEventListener('mouseenter', (e) => {
			options.style.width = '25vw';
		});
		menuSlider.addEventListener('mouseleave', (e) => {
			options.style.width = '0';
		});
	})();

	// Cargar evento para el boton del carro
	let shoppingBtn = document.querySelector('div.menu > div.shopping');
	let itemsContainer;

	shoppingBtn.addEventListener('click', (e) => {

		itemsContainer = document.querySelector('.container');
		document.querySelector('body').innerHTML = shoppingScreenTemplate();

		if(document.querySelector('.table-wraper')) {
			loadShoppingScreenEvents();
		}

		setTimeout(() => {

			let closeBtn = document.querySelector('.close-icon');
			let shoppingScreen = document.querySelector('.shopping-screen');

			closeBtn.addEventListener('click', (e) => {
				carrousel = 1;
				shoppingScreen.parentNode.removeChild(shoppingScreen);
				document.querySelector('body').appendChild(itemsContainer);

				if(addedItems.length === 0) {
					shoppingBtn.dispatchEvent(new Event('remove'));
				}
			});
		}, 100);
	});

	/* Funciones variadas */

	// Agregar o sumar a los items
	function addItems(productName, originalPrice, mount) {

		let index = -1;

		for(let i = 0; i < addedItems.length; i++) {
			if(addedItems[i].name === productName) {
				index = i;
			}
		}

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
			addedItems[index].total = addedItems[index].cost*addedItems[index].amount;
		}
	}

	// Funcion para recuperar objetos
	function getItems() {
		return fetch("/dead-day-items").then((res) => res.json());
	}

	// Función para retornar el costo del total a pagar
	function getTotal() {
		
		let allPricesInCart = addedItems.map( item => item.total );
		
		let total = allPricesInCart.reduce((prev, curr) => {
			return prev + curr;
		}, 0);

		return total;
	}

	// Cargar pantalla de formulario
	function loadNextAction() {

		let containerR = document.querySelector('.table-wraper');
		
		switch (carrousel) {
			case 1:
				containerR.innerHTML = usernameScreenTemplate();
				carrousel++;
				break;
			case 2:
				addUserData();
				containerR.innerHTML = userAddressScreenTemplate();
				carrousel++;
				break;
			case 3:
				addUserData();
				containerR.innerHTML = userCardScreenTemplate();
				document.querySelector('.buy-btn').textContent = "Comprar";
				carrousel++;
				break;
			case 4:
				addUserData();
				document.querySelector('.buy-wraper').style.display = 'none';
				containerR.innerHTML = loader();
				sendUserData(containerR);
				break;
			default:
				alert("I miss you");
				break;
		}
	}

	// Guardar información del usuario en objeto
	function addUserData() {

		let data = document.querySelectorAll('.userdata');
		
		data.forEach((item) => {

			let attributeName = item.getAttribute('name');
			userData[attributeName] = item.value;
		});
	}

	// Enviar datos de usuario
	function sendUserData(container) {

		userData.items = addedItems;

		let orderData = JSON.stringify(userData);

		fetch("/order", {
			method: 'POST',
			body: orderData
		})
		.then((res) => {
			if(res.ok) {
				addedItems = [];
				userData = [];
				container.innerHTML = itsOk();
			}
			else {
				alert("Algo salió mal");
			}
		})
		.catch(() => {
			alert("Somethig is wrong");
		});
	}

	/* Plantillas */
	// Loader
	function loader() {
		return `
			<div class="height-100 width-100-pc">
				<div class="loader loading first">
				  	<div class="loading second">
				    	<div class="loading third"></div>  
				  	</div>  
				</div>
			</div>
		`;
	}
 
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
				<div class="result-container">
					${
						addedItems.length === 0 ? nothingToBuyTemplate(): buyingBoardTemplate() 
					}
				</div>
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
					<span>Total: $<span class="total">${ getTotal() }</span></span>
				</div>
				<div class="buy-btn-wraper">
					<div class="buy-btn default-cursor">Siguiente</div>
				</div>
			</div>
		`;
	}

	function boughtItemCard(item) {
		return `
			<div class="bought-card default-cursor">
				<header>
					<span class="material-icons md md-light">delete</span>
				</header>
				<main>
					<div class="rm-btn width-15-pc flex-center">
						<span class="material-icons md md-dark">remove</span>
					</div>
					<div class="info-wraper width-70-pc">
						<div class="flex-center">
							<span class="name">${ item.name }</span>
						</div>
						<div class="flex-center">
							<span class="amount">${ item.amount }</span>
						</div>
						<div class="flex-center">
							<span>Total: $<span class="item-total">${ item.total }</span> MX</span>
						</div>
					</div>
					<div class="sm-btn width-15-pc flex-center">
						<span class="material-icons md md-dark">add</span>
					</div>
				</main>
			</div>
		`;
	}

	function usernameScreenTemplate() {
		return `
			<div class="form-data flex-center">
				<div class="screen-icon">
					<span class="material-icons md-70 md-gray">email</span>
				</div>
			    <input type="text" placeholder="Nombre completo" class="userdata width-35-pc font-1-2-vw" name="username"/>
			    <input type="email" placeholder="Email" class="userdata width-35-pc font-1-2-vw" name="email"/>
			</div>
		`;
	}

	function userAddressScreenTemplate() {
		return `
			<div class="form-data flex-center">
				<div class="screen-icon">
					<span class="material-icons md-70 md-gray">local_shipping</span>
				</div>
				<div class="width-35-pc">
					<div class="flex-center">
			         	<input type="text" placeholder="Dirección completa" class="userdata width-100-pc font-1-2-vw" name="address"/>
			        </div>
			        <div class="row-nowrap">
			            <input type="text" placeholder="Código postal" class="userdata width-40-pc font-1-2-vw" name="cp"/>
						<input type="text" placeholder="Teléfono móvil" class="userdata width-40-pc font-1-2-vw" name="phone"/>
			        </div>
				</div>
			</div>
		`;
	}

	function userCardScreenTemplate() {
		return `
			<div class="form-data flex-center">
				<div class="screen-icon">
				<span class="material-icons md-70 md-gray">payment</span>
				</div>
				<div class="width-35-pc">
					<div class="flex-center">
			         	<input type="text" placeholder="Numero de tarjeta" class="userdata width-100-pc font-1-2-vw" name="card"/>
			        </div>
			        <div class="row-nowrap">
			            <input type="text" placeholder="Fecha de expiración" class="userdata width-40-pc font-1-2-vw" name="expiration"/>
						<input type="text" placeholder="CCV" class="userdata width-40-pc font-1-2-vw" name="ccv"/>
			        </div>
				</div>
			</div>
		`;
	}

	function itsOk() {
		return `
			<div class="sorry-screen flex-center height-100 width-100-pc">
				Su pedido se realizó con exito
			</div>
		`;
	}
});
