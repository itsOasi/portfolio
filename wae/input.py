# def login_with_github()

# def load_from_github()
	
# def download_from_store()

def store_uploaded_file(name, data):
    # create file for writing in binary
    f = open(name, "wb+")
    # write data to file
    f.write(data)
    # log to console for debugging
    print(f"{f.read()}")

def set_config(key, value):
    # open config file as json object
    # set key value
    # close config file
    pass

def get_config(key):
    # open config file as json object
    # return key value
    pass
