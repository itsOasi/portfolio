inst_set = {
	"0001": Computer.load
}

def to_int(bits):
		_bits = []
		for bit in range(len(bits)):
			_bits.append(int(bit))
		
		_bits.reverse() # start from lowest place value
		place = 1
		total = 0 # keep track of value
		for bit in _bits:
			total += place * bit # add bits by place value
			place *= 2 # move to the next place value
		return total

		def to_bits(_int):
			bits = [] # start array to hold bits
			place = 1 
			place_count = 1 # to find how many bits to add
			is_odd = bool(_int % 2) # check if number is odd
			
			if is_odd:
				_int -= 1 # subtract 1 to set last bit
				
			while place < _int: # find highest digit
				place *= 2
				place_count += 1
			
			for _ in range(place_count):
				bits.append(0) # fill array based on how many digits are needed
			
			for bit in range(len(bits)):
				if _int >= place:
					bits[bit] = 1 # set bit
					_int -= place # subtract place value
				place /= 2 # move down the array
			
			if is_odd:
				bits[len(bits)-1] = 1
			
			# makes sure number of bits shown is multiple of 4
			just_add = False
			while len(bits)%4:
				offset = len(bits)%4
				if not just_add and offset > 1 and not bits[0]:
					bits.pop(0)
					just_add = True # if continuing to pop removes necessary data
				else: 
					bits.insert(0,0) # add unnecessary data for the sake of convention
			
		# convert to string
		s_bits = ""
		for bit in bits:
			s_bits += str(bit)
		return s_bits

class Computer:
	def __init__(self):
		self.ram = [""] * 16
		self.disk = [""] * (16*4)
		self.cores = {
			"0001":Core(),
			"0010":Core(),
			"0011":Core(),
			"0100":Core()
		}
		
	
	def assign(self, core = "0001"):
		# transfers first instruction from ram to core
		pass

	def load(self, index=0):
		# loads instruction from disk at given index into ram
		self.disk[index]

class Core:
	registers = {
		"0001":"",
		"0010":"",
		"0011":"",
		"0100":""
	}
	cache=[""]
		

class Blob:
	# blobs are passed around the system
	# as the data for computation
	def __init__(self, value):
		# they hold an array of bits
		self.value = to_bits(value)

b = Blob(34)
print(b.value)