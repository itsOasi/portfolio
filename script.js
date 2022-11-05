import { animate } from "./animation.js";

const main = document.getElementById("content");
const navSpeed = .5
let numOfItems = 0
let paused = false; // sets nav speed slower

let quotes = [
	"Move fast and break things?",
	"Like what you see?",
	"Let's do business!",

];

// Navigation
let moveItems = (x, y) => {
	let rect = main.getBoundingClientRect();
	if (x){
		main.style.left = `${rect.left + x}px`;
	}
	if (y){
		main.style.top = `${rect.top + y}px`;
	}
}

let addItem = (text, imageLink, imgHeight=10) => {
	// creates an div with a bit of pic/video and a caption
	let item = document.createElement("div");
	item.id = `item_${numOfItems}`;
	item.classList.add("item");
	let txt = document.createElement("p");
	let img = document.createElement("embed");
	txt.innerText = text;
	img.src = imageLink;
	img.style.maxHeight = `${imgHeight}rem`;
	img.classList.add("media");
	item.append(img);
	item.append(txt);
	main.append(item);
	item.onmouseenter = () => {
		paused = !paused
	}
	item.onmouseleave = () => {
		paused = !paused
	}

	numOfItems++;
};

document.body.onload = (event) => {	
	if (window.innerWidth > 800) {
		document.body.style.overflow = "hidden";
	}

	document.getElementById("title").innerText = quotes[Math.floor(Math.random() * quotes.length)]

	// get the url
	let url = document.location.pathname.slice(1);
	
	addItem(`Welcome to my Portfolio site
		It's still a WIP`,
		"static/components/portfolio/intro/20220328_152539.jpg");
	addItem(`Welcome to my Portfolio site
		It's still a WIP`,
		"static/components/portfolio/intro/20220328_152539.jpg");
	addItem(`Welcome to my Portfolio site
			It's still a WIP`,
			"./static/components/portfolio/candy_kitty/poster.png");
	addItem(`Welcome to my Portfolio site
		It's still a WIP`,
		"static/components/portfolio/intro/20220328_152539.jpg");
	addItem(`Check out my latest certification! There's a ton more in my certifcations folder.`,
		"https://drive.google.com/file/d/1cHzfV91oNkQJWjIeOW0Z-Y0NZ7WpX1hU/preview");
	addItem(`Welcome to my Portfolio site
		It's still a WIP`,
		"static/components/portfolio/intro/20220328_152539.jpg");
	
	let oldPageX = window.pageX;
	let oldPageY = window.pageY;
	
	let navigate = (event, speed) =>{
		let deltaY = event.pageY - oldPageY;
		let deltaX = event.pageX - oldPageX;
		
		// move everything closer to the mouse
		moveItems(-deltaX * speed, -deltaY * speed);
				
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
		navigate(event, speed);
	}
}