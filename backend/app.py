from flask import Flask, request, make_response, jsonify
# from flask_sqlalchemy import SQLAlchemy
import os
import json

app = Flask(__name__)

def get_data_from_file():
    try: 
        with open('users_login_data.json', 'r') as fil:
            return json.load(fil)
    except FileNotFoundError:
        return []

users_login_data = get_data_from_file()

@app.route('/add_user', methods =['POST'])
def add_user():
    password = request.form.get('password')
    usrname = request.form.get('username')
    
    for user in users_login_data:
        if(user['username']== usrname):
            return jsonify({'message': 'Username exists'}), 400
    
    users_login_data.append({'username':usrname, 'password':password })   
    with open('users_login_data.json', 'w') as fil:
        json.dump(users_login_data,fil)
    return jsonify({'message': 'User added sucessfully'}), 200
    

@app.route('/authenticate', methods =['POST'])
def authenticate():
    password = request.form.get('password')
    usrname = request.form.get('username')
    
    for user in users_login_data:
        if(user['username']== usrname and user['password'] ==  password):
            return jsonify({'message': 'Successfully Authenticated'}), 200
        if(user['username']== usrname and user['password'] !=  password):
            return jsonify({'message': 'Wrong password'}), 200
        
    return jsonify({'message': 'User doesn\'t exist'}), 400


if __name__ == '__main__':
    app.run(debug=True)