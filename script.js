const main = document.getElementById("main");
let navSpeed = 2.5
let numOfItems = 0
let paused = false;
let addItem = (text, imgHeight, imageLink) => {
	let item = document.createElement("div");
	item.id = `item_${numOfItems}`;
	item.classList.add("item");
	let txt = document.createElement("p");
	let img = document.createElement("img");
	txt.innerText = text;
	txt.style.bottom = "3rem"
	txt.style.left = "3rem"
	img.src = imageLink;
	img.style.maxHeight = `${imgHeight}rem`;
	item.append(img);
	item.append(txt);
	main.append(item);
	main.onmouseenter = (event) => {
		img.style.maxHeight = `${imgHeight*1.5}rem`;
		paused = !paused;
	}
	main.onmouseleave = (event) =>{
		img.style.maxHeight = `${imgHeight}rem`;
		paused = !paused;
	}
	numOfItems++;
};

document.body.onload = (event) => {
	// get the url
	let url = document.location.pathname.slice(1);
	addItem(`Welcome to my Portfolio site
	It's still a WIP`, 20,
		"static/components/portfolio/intro/20220328_152539.jpg");
	let items = document.getElementById("main");
	let oldPageX = window.pageX;
	let oldPageY = window.pageY;

	
	// Navigation
	let moveItems = (x, y) => {
		if (x){
			items.style.left = `${x}px`;
		}
		if (y){
			items.style.top = `${y}px`;
		}
	}

	let navigate = (event) =>{
		let xDist = event.pageX - window.screenX;
		let yDist = event.pageY - window.screenY;
		let deltaY = event.pageY - oldPageY;
		let deltaX = event.pageX - oldPageX;
		
	
		// // when mouse moves, move everything else the other way
		let rect = items.getBoundingClientRect();
		moveItems(rect.left - (deltaX * navSpeed), rect.top - (deltaY * navSpeed));
		
		// update previous coords
		oldPageX = event.pageX;
		oldPageY = event.pageY;
	}

	// on desktop
	window.onmousemove = (event) => {
		let speed = navSpeed
		if (paused){
			speed = navSpeed * .1;
		}
		navigate(event);
	}
	// on mobile
	window.onmousedown = (event) =>{
		if (navigator.userAgentData.mobile) {
			navigate(event);
		}
		
	}
};
