import { animate } from "./animation.js";

const main = document.getElementById("content");
const driftSpeed = .05
const driftAmount = 5
let numOfItems = 0

let quotes = [
	"Move fast and break things? 🤔",
	"Like what you see? Made with 💞",
	"Let's do business! 💼",
	"Rome wasn't built in a day! 📈",
	"We live in a society! 🏢",
	"I got bills to pay! 😤"
];

// Navigation
let moveItems = (x, y) => {
	main.style.left = `${x*driftAmount}px`;
	main.style.top = `${y*driftAmount}px`;
}

let addItem = (text, imageLink, href="", imgHeight=30) => {
	// creates an div with a bit of media and a caption
	let item = document.createElement("a");
	item.id = `item_${numOfItems}`;
	item.classList.add("item");
	item.href = href;
	if (!href){
		item.style.cursor = "default";
		item.onclick = (event) =>{
			event.preventDefault();
		}
	}

	let txt = document.createElement("p");
	txt.innerText = text;
	
	let img = document.createElement("embed");
	img.src = imageLink;
	img.style.maxHeight = `${imgHeight}rem`;
	img.classList.add("media");
	img.classList.add("media");

	item.append(img);
	item.append(txt);
	main.append(item);
	numOfItems++;
};

document.body.onload = (event) => {	
	if (window.innerWidth > 800) {
		document.body.style.overflow = "hidden";
	}
	
	document.getElementById("title").innerText = quotes[Math.floor(Math.random() * quotes.length)];
	setInterval(()=>{
		document.getElementById("title").innerText = quotes[Math.floor(Math.random() * quotes.length)];
	}, 5000);

	addItem(`Welcome to my Portfolio site 🙋🏾
		It's still a WIP`,
		"static/components/portfolio/intro/profile picture final.png");
	addItem(`Here is my resume`,
			"static/components/portfolio/r_and_c/resume and cover letter purp short.pdf");
	addItem(`Check out my latest certification! There's a ton more in my certifcations folder.`,
		"https://drive.google.com/file/d/1cHzfV91oNkQJWjIeOW0Z-Y0NZ7WpX1hU/preview");
	addItem(`Here, you can find all of my source code. Even for this page!`,
		"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
		"https://github.com/itsOasi");
	
	let oldPageX = window.pageX;
	let oldPageY = window.pageY;
	
	window.onmousemove = (event) =>{
		let deltaY = event.pageY - oldPageY;
		let deltaX = event.pageX - oldPageX;
		
		// move everything closer to the mouse
		moveItems(deltaX * -driftSpeed, deltaY * -driftSpeed);
				
		// update previous coords
		oldPageX = event.pageX;
		oldPageY = event.pageY;
	}

}
