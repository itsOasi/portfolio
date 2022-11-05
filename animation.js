export let animate = {
	custom: function (func, dur, ease){
		setInterval(function(){
			animation(func, dur, ease);
		}, dur)
	},
	lerp: function (value, a, b, dur){
		setInterval(function(){
			animation(Math.lerp(), dur, );
		}, dur)
	}
}

function animation (render, duration, easing) {
	var start = Date.now();
	let loop = () => {
		var p = (Date.now()-start)/duration;
		if (p > 1) {
		render(1);
		}
		else {
		requestAnimationFrame(loop);
		render(easing(p));
		}
	};
}