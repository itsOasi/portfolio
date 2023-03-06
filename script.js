const HOST = "https://portfolio-server-2jochkae6a-uc.a.run.app"

let http = {
	get: async(url) =>
	{
		let res = await fetch(url)
		return await res
	},
	post: async(url, data) => {
		let res = await fetch(url, {
			method: "post",
			body: data
		})
		return await res
	}

}

class Product{
	constructor(title, img, link, details, color){
		this.title = title;
		this.img = img;
		this.link = link;
		this.details = details;
		this.color = color;
	}
}

let products = [];

function add_product(prod_data){
	let p = new Product(prod_data["title"], prod_data["image"], prod_data["link"], prod_data["desc"], prod_data["color"]);
	products.push(p);
}

function create_catalog_item(product_obj){
	let item = document.createElement("a");
	item.classList.add("item");
	item.classList.add("card");
	item.href = product_obj.link;
	
	let img_el = document.createElement("img");
	img_el.classList.add("item-img");
	img_el.src = product_obj.img;
	item.append(img_el);
	
	let details = document.createElement("div");
	details.classList.add("item-det");

	let title_el = document.createElement("p");
	title_el.classList.add("item-title");
	title_el.innerText = product_obj.title;
	details.append(title_el);

	let desc_el = document.createElement("p");
	desc_el.classList.add("item-desc");
	desc_el.innerText = product_obj.details;
	details.append(desc_el);

	item.append(details);
	
	return item;
}

document.body.onload = async function(){
	let res = await http.get(`${HOST}/get_catalog`);
	let catalog = await res.json();
	// console.log(catalog);
	let catalog_list = document.querySelector("#content");
	for (_prod in catalog){
		add_product(catalog[_prod]);
	}
	for (prod in products){
		catalog_list.append(create_catalog_item(products[prod]));
	}
}

let mouse_glow = document.getElementById("mouse-glow");
document.body.onmousemove = function(e){
	mouse_glow.animate({
		left: `${e.clientX - mouse_glow.offsetWidth/2}px`,
		top: `${e.clientY - mouse_glow.offsetWidth/2}px`
	}, {duration: 1000, fill: "forwards"});
}

/***************************************************/
var iconMenu = document.getElementById("iconMenu");
if (iconMenu) {
iconMenu.addEventListener("click", function () {
	var popup = document.getElementById("menuContainer");
	if (!popup) return;
	var popupStyle = popup.style;
	if (popupStyle) {
	popupStyle.display = "flex";
	popupStyle.zIndex = 100;
	popupStyle.backgroundColor = "rgba(113, 113, 113, 0.3)";
	popupStyle.alignItems = "center";
	popupStyle.justifyContent = "center";
	}
	popup.setAttribute("closable", "");

	var onClick =
	popup.onClick ||
	function (e) {
		if (e.target === popup && popup.hasAttribute("closable")) {
		popupStyle.display = "none";
		}
	};
	popup.addEventListener("click", onClick);
});
}