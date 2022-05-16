class Model:
	'''
		the model consists of textual data input 
		from the user to be sorted and read into
		browser ready web page files	
	'''
	html = {}	# selector_id: content
	css = {}	  # selector: content
	js = {}		 # function_name: function
	svg = {}	  # filename: filedata
	index = {
		"html":"",
		"css":"", 
		"js":"" 
	}
	
	def __init__(self, data_loc = "", kwargs={}):
		if not data_loc == "":
			pass # sort data into dictionaries
	
	def add_component(self, kwargs={}):
		''' 
			attaches component to the model
		
			"type":["html", "css", "js", "svg"],
			
			"key":"html id", "css selector", "js function name", "svg file name"
			
			"value": "text"
		'''
		model = self.__getattribute__(kwargs["type"])
		model[kwargs["key"]] = kwargs["value"]
	
	def add_svg_element(self, id, filename, data):
		self.html[filename] = data

	def compile(self, kwargs={}):
		# write separate files for html components and their scripts

		# write index data to the index html, css, and js pages
		pass
		
	def decompile(self, kwargs={}):
		# get data from input folder
		pass