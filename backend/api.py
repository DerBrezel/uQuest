# this is just an example initializer
# try to put all the api-calls in this file and use additional files to do your calculations

from flask import Flask

app = Flask(__name__)



# we use functions like this to send data to the frontend.
# in this example '/hello' will be called by the frontend and the return-value will be send over.
@app.route('/hello')
def hello_world():
    return {'text': "Hello this works"}
