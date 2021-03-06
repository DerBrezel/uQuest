# this is just an example initializer
# try to put all the api-calls in this file and use additional files to do your calculations

from flask import Flask, request, session
from flask_session import Session
from filtering import filter, updatefilter

app = Flask(__name__)

# configure session
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)


# we use functions like this to send data to the frontend.
# in this example '/hello' will be called by the frontend and the return-value will be send over.
@app.route('/hello')
def hello_world():
    return {'text': "Hello this works"}


@app.route('/getQuest', methods=['GET', 'POST'])
def get_quest():
    if "job" not in session:
        session["job"] = "Thief"
        session["playstyle"] = "Fight"
        session["time"] = "some time"
        session["pp"] = None

    if request.method == 'GET':
        results, pp = filter('skyrim_db.csv', session["job"], session["playstyle"], session["time"], session["pp"])
        session["pp"] = pp
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}

    if request.method == 'POST':
        response = request.get_json()
        session["time"] = response['time']
        session["job"] = response['job']
        session["playstyle"] = response['playstyle']
        results, pp = filter('skyrim_db.csv', session["job"], session["playstyle"], session["time"], session["pp"])
        session["pp"] = pp
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}


@app.route('/updatepp', methods=["POST"])
def update_pp():
    if request.method == 'POST':
        response = request.get_json()
        loot = response['loot']
        fight = response['fight']
        explore = response['explore']
        results, pp = updatefilter('skyrim_db.csv', session["job"], session["playstyle"], session["time"], loot, fight,
                                   explore, session["pp"])
        session["pp"] = pp
        return {'name': results[1], 'type': results[2], 'location': results[3], 'area': results[4], 'npc': results[5],
                'followup': 0}  # change results[6] so it never returns nan results[6]}
    pass


if __name__ == '__main__':
    app.run()
