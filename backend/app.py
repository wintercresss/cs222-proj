from flask import Flask, request, make_response, jsonify
# from flask_sqlalchemy import SQLAlchemy
import os
import json
import bcrypt

app = Flask(__name__)

def get_data_from_file():
    try: 
        with open('users_login_data.json', 'r') as fil:
            return json.load(fil)
    except FileNotFoundError:
        return []

users_login_data = get_data_from_file()

# hash password during registration
def hash_password(password):
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(bytes, salt)

    return hashed_password

def check_password(entered_password, stored_hashed_password): # for user login authentication
    return bcrypt.checkpw(entered_password.encode('utf-8'), stored_hashed_password)

@app.route('/add_user', methods =['POST'])
def add_user():
    usr_data = request.get_json()
    password = usr_data.get('password')
    usrname = usr_data.get('username')
    
    for user in users_login_data:
        if(user['username']== usrname):
            return jsonify({'message': 'Username exists'}), 400
    
    hashed_password = hash_password(password)
    
    users_login_data.append({'username':usrname, 'password':hashed_password.decode('utf-8')}) # have to decode to utf-8 format, or else it can't be stored in JSON format
    with open('users_login_data.json', 'w') as fil:
        json.dump(users_login_data,fil)
    return jsonify({'message': 'User added sucessfully'}), 200
    

@app.route('/authenticate', methods =['POST'])
def authenticate():
    usr_data = request.get_json()
    password = usr_data.get('password')
    usrname = usr_data.get('username')
    
    for user in users_login_data:
        if user['username']== usrname:
            if check_password(password, user['password'].encode('utf-8')):
                return jsonify({'message': 'Successfully Authenticated'}), 200
            else:
                return jsonify({'message': 'Wrong Password'}), 400
        
    return jsonify({'message': 'User doesn\'t exist'}), 400



if __name__ == '__main__':
    app.run(debug=True)