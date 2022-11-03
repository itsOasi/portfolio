const navSpeed = 2.5
let numOfItems = 0
let addItem = (text, imageLink) => {
	let main = document.getElementById("main");
	let item = document.createElement("div");
	item.id = `item_${numOfItems}`;
	item.classList.add("item");
	let txt = document.createElement("p");
	let img = document.createElement("img");
	txt.innerText = text;
	txt.style.bottom = "3 rem"
	img.src = imageLink;
	img.style.maxHeight = "20rem";
	img.style.left = Math.floor(Math.random() * (window.screenX * 2));
	img.style.top = Math.floor(Math.random() * (window.screenY * 2));
	item.append(img);
	item.append(txt);
	main.append(item);
	numOfItems++;
};

document.body.onload = (event) => {
	// get the url
	let url = document.location.pathname.slice(1);
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	addItem(`Welcome to my Portfolio site
	It's still a WIP, but here\'s some chicken`, 
		"https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg")
	
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
		navigate(event);
	}
	// on mobile
	window.onmousedown = (event) =>{
		if (navigator.userAgentData.mobile) {
			navigate(event);
		}
		
	}
};
