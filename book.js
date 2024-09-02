document.body.onload = () => {
	Calendly.initInlineWidget({
	  "url": 'https://calendly.com/ostally001/15min',
	  "parentElement": document.getElementById('calendar'),
	  "prefill": {},
	  "utm": {}
	});
}