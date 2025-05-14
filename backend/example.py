from flask import Flask, jsonify, request #jsonify is used to send info to react via json files
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
name = {"count": 1}
#get
@app.route('/api/data')
def data_jsonify():
    #returns a json file, it works like a dictonarie, assign a variable name (name) and value (bulga)
    #we'll take this info later on, on react
    global name
    return jsonify(name)
    # if we enter the  flask site rn will see the content of the json file

#post example
@app.route('/api/send', methods=['POST'])
def sendpost():
    global name

    #gets wut belongs TO US
    #now we have our data in pythhon
    data = request.get_json()
    #print('Data:', data)

    #get something from dicionary
    namee = data['username']
    password = data['password']
    print(f"your name is { namee }, and ur password is { password }")
    name["count"] += 1

    return jsonify(name)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
