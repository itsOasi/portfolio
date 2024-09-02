let mouse_glow = document.getElementById("mouse-glow");
window.onpointermove = function(e){
	mouse_glow.animate({
		left: `${e.clientX}px`,
		top: `${e.clientY+window.scrollY}px`
	}, {duration: 1000, fill: "forwards"});
}
window.onscroll = function(e){
	mouse_glow.animate({
		left: `${e.clientX}px`,
		top: `${e.clientY+window.scrollY}px`
	}, {duration: 1000, fill: "forwards"});
}

/***************************************************/
var iconMenu = document.getElementById("iconMenu");
if (iconMenu) {
iconMenu.onClick = ()=>{
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
};
}