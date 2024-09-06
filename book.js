document.body.onload = () => {
	Calendly.initInlineWidget({
	  "url": 'https://calendly.com/ostally001/consultation',
	  "parentElement": document.getElementById('calendar'),
	  "prefill": {},
	  "utm": {}
	});
}