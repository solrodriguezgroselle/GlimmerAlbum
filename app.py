import os
import logging
from flask import Flask, render_template

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "glimmer-default-secret-key")

@app.route('/')
def index():
    """Main route that serves the GLIMMER photo album tutorial"""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
