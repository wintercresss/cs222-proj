from flask import Flask, request, make_response, jsonify
# from flask_sqlalchemy import SQLAlchemy
import os
import json
import bcrypt
from wordcloud import WordCloud
import matplotlib.pyplot as plot

import matplotlib
matplotlib.use('Agg')  

import base64
from io import BytesIO
import pandas as pd

app = Flask(__name__)

# Read the spotify songs data file 
spotify_songs_data = pd.read_csv('Spotify_Million_Song_Dataset_exported.csv')

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

@app.route('/lyrics_wordcloud', methods =['POST'])
def lyrics_wordcloud():
    try:
        lyrics_data = request.get_json()
        songs = lyrics_data.get('lyrics')
        combined_string = ' '.join(songs)
        lyrics_cloud = WordCloud( height = 500, width = 1000, background_color= 'yellow').generate(combined_string)
        
        plot.figure(figsize=(20,10))
        plot.axis('off') # Remove the axes from the image to not clutter the image
        plot.imshow(lyrics_cloud) 
        image_as_bytes = BytesIO() # creates a temporary binary IO stream object that behaves like a file 
        plot.savefig(image_as_bytes, format ='png')
        image_as_bytes.seek(0) # Read the bytes from the beginning
        plot.close()

        return jsonify({'message': 'Worcloud generated', 
                        'wordcloud_image_as_bytes': base64.b64encode(image_as_bytes.read()).decode('utf-8')}), 200

    except Exception as exc:
        print(exc)
        return jsonify({'message': 'Worcloud cannot be generated'}), 400
 
@app.route('/search_lyrics', methods =['POST'])
def search_lyrics():
    song_to_search = request.get_json().get('search_song')
    response_rows_true = spotify_songs_data['song'].str.contains(song_to_search, regex= False, case = False)
    search_result = spotify_songs_data[response_rows_true]
    
    if search_result.empty == True:
        return jsonify({'message': 'Song is not found'}), 400
    
    song_details = search_result.iloc[0] # Extract the row 1 details from the search result dataframe 
    print(song_details['text'])
    
    return jsonify({'message': 'Song is found', 'lyrics': song_details['text']}), 200

if __name__ == '__main__':
    app.run(debug=True)
    
    
