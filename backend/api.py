# this is just an example initializer
# try to put all the api-calls in this file and use additional files to do your calculations

from flask import Flask
from filtering import filter

app = Flask(__name__)

pp = 'preference profile'
results = filter('skyrim_db.csv', 'thief', pp)


# we use functions like this to send data to the frontend.
# in this example '/hello' will be called by the frontend and the return-value will be send over.
@app.route('/hello')
def hello_world():
    return {'text': "Hello this works"}


@app.route('/getQuest')
def get_quest():
    return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
            'followup': results[6]}
