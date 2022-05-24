from waitress import serve
from main import app

serve(app, listen="*:80")
