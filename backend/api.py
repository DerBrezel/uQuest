# this is just an example initializer
# try to put all the api-calls in this file and use additional files to do your calculations

from flask import Flask, request
from filtering import filter

app = Flask(__name__)
job = 0
playstyle = 0
time = 0

# we use functions like this to send data to the frontend.
# in this example '/hello' will be called by the frontend and the return-value will be send over.
@app.route('/hello')
def hello_world():
    return {'text': "Hello this works"}


@app.route('/getQuest', methods=['GET', 'POST'])
def get_quest():
    job = "Thief"
    playstyle = "Fight"
    time = "Short"

    if request.method == 'GET':
        results = filter('skyrim_db.csv', job, playstyle, time)
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}

    if request.method == 'POST':
        response = request.get_json()
        time = response['time']
        job = response['job']
        playstyle = response['playstyle']
        results = filter('skyrim_db.csv', job, playstyle, time)
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}

@app.route('/updatepp')
def update_pp():
    if request.method == 'POST':
        response = request.get_json()
        loot = response['loot']
        fight = response['fight']
        explore = response['explore']
        results = filter('skyrim_db.csv', job, playstyle, time)
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}
    pass
