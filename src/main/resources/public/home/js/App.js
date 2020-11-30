const main = () => {

	let sunglasses = document.querySelectorAll('.sunglass');
	let menuBar = document.querySelector('.menu-bar');

	let SlideTime = 450;

	for(let i = 0; i < sunglasses.length; i++) {
		sunglasses[i].addEventListener('click', (e) => {			
			
			if(e.target.parentElement.nextElementSibling !== null) {
				
				e.target.parentElement.style.height = 0;
				e.target.parentElement.nextElementSibling.style.height = "100vh";
				
				setTimeout(() => {
					e.target.parentElement.style.display = "none";
				}, SlideTime);

				displaySomething(e.target.parentElement.nextElementSibling);
			}
		});
	}

	function displaySomething(screen) {

		let classN;

		for(let i = 0; i < screen.className.length; i++) {
			if(screen.className[i] === " ") {

				classN = screen.className.substring(0, i);
				break;
			}
		}

		switch (classN) {
			case "second":
				displaySecondCard(screen);
				break;
			case "third":
			    displayThirdCard(screen);
				break;
			case "fourth":
				displayFourthCard(screen);
				break;
			default:
				console.log("default");
				break;
		}
	}

	function displaySecondCard(screen) {
		setTimeout(() => {
			screen.firstElementChild.firstElementChild.style.left = "10vw";			
		}, SlideTime);
	}

	function displayThirdCard(screen) {
		menuBar.style.backgroundColor = "rgba(255, 255, 255, .5)";
		setTimeout(() => {
			screen.firstElementChild.firstElementChild.style.opacity = 100;
		}, SlideTime);
	}

	function displayFourthCard(screen) {
		menuBar.style.backgroundColor = "rgba(0, 0, 0, .5)";
		setTimeout(() => {
			screen.querySelector('.right').style.opacity = 100;
			screen.querySelector('.left').style.opacity = 100;
		}, SlideTime);
	}
}

window.addEventListener('load', main);