from flask import Flask, request, make_response, jsonify
# from flask_sqlalchemy import SQLAlchemy
import json
import bcrypt
from wordcloud import WordCloud
import matplotlib.pyplot as plot

import matplotlib
matplotlib.use('Agg')  

import base64
from io import BytesIO
import pandas as pd
from flask_cors import CORS

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import markovify

app = Flask(__name__)
CORS(app)

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

        return jsonify({'message': 'Wordcloud generated', 
                        'wordcloud_image_as_bytes': base64.b64encode(image_as_bytes.read()).decode('utf-8')}), 200

    except Exception as exc:
        print(exc)
        return jsonify({'message': 'Wordcloud cannot be generated'}), 400
 
@app.route('/search_lyrics', methods =['POST'])
def search_lyrics():
    song_to_search = request.get_json().get('search_song')
    response_rows_true = spotify_songs_data['song'].str.contains(song_to_search, regex= False, case = False)
    search_result = spotify_songs_data[response_rows_true]
    
    if search_result.empty == True:
        return jsonify({'message': 'Song is not found'}), 400
    
    song_details = search_result.iloc[0] # Extract the row 1 details from the search result dataframe 
    # print(song_details['text'])
    
    return jsonify({'message': 'Song is found', 'lyrics': song_details['text']}), 200

@app.route('/find_song', methods=['GET'])
def find_song():
    song_to_search = request.args.get('song', '') # defaults to empty string if 'song' is not provided
    arr = (spotify_songs_data[spotify_songs_data['song'].str.contains(song_to_search, case=False)]['song'].tolist())
    # finds all songs containing the input (search the song column), returns the song column, and converts it into a list. case=false is to ignore lower/uppercase
    print(arr)
    return jsonify(arr)

@app.route('/find_artist', methods=['GET'])
def find_artist():
    artist_to_search = request.args.get('artist', '') # defaults to empty string if artist not provided
    arr = (spotify_songs_data[spotify_songs_data['artist'].str.contains(artist_to_search, case=False)]['artist'].tolist())
    artistset = list(set(arr)) # first turn our array into a set to remove duplicate artists, then convert back into a list so that it can be jsonified
    print(artistset)
    return jsonify(artistset)


@app.route('/song_recommender', methods =['POST'])
def song_recommender():
    try:
        lyrics_input_data = request.get_json()
        target_song_lyrics = lyrics_input_data.get('lyrics_input_data')
        
        tfidf_vectorizer_english = TfidfVectorizer(stop_words='english') # TDIDF calculator excluding the generic english words
        all_songs = [target_song_lyrics] + list(spotify_songs_data['text']) # list of all the songs 
        tfidf_matrix_english = tfidf_vectorizer_english.fit_transform(all_songs) # calculate the term frequency for all the words in these songs 
        similarity_level = cosine_similarity(tfidf_matrix_english[0:1], tfidf_matrix_english[1:]) # calculate the cosine similarity between target song and other songs 
        cosine_similarities_flattened = similarity_level.flatten()  # make sure the resulting array is 1-dimensional
        
        cosine_similarities_flattened[0] = -1 # Remove the target song cosine similarity 
        
        top_10_indices = cosine_similarities_flattened.argsort()[-10:][::-1] # find the top 10 songs, ordered by best to worst match
        rec_songs_info = spotify_songs_data.iloc[top_10_indices]
        # print("this is it:", rec_song_info['song'])
        return jsonify({"message": "Recommended song found", "recommended_songs": rec_songs_info['song'].tolist()}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Recommended song not found"}), 400
        
@app.route('/make_song', methods =['POST'])
def make_song():
    try:
        lyrics_data = request.get_json()
    
        songs = lyrics_data.get('target_songs')
        response_rows_true = spotify_songs_data['song'].str.contains('|'.join(songs), case=False)
        search_result = spotify_songs_data[response_rows_true]
        lyrics_list = []
        for i in range(len(search_result)):
            ith_song_details = search_result.iloc[i]
            lyrics_list.append(ith_song_details['text'])
        
        all_lyrics_text = '\n'.join(lyrics_list)
        markov_text_generation_model = markovify.NewlineText(all_lyrics_text, state_size= 2 ) # fit the songs' lyrics in the markov text generation model
        
        sentences_generated = []
        for i in range(10):
            sentence = markov_text_generation_model.make_sentence()
            sentences_generated.append(sentence)
        print(sentences_generated)
        
        sentences_generated_filtered = []
        for i in range(10):
            if sentences_generated[i] is not None:
                sentences_generated_filtered.append(sentences_generated[i])
               
        generated_song = '\n'.join(sentences_generated_filtered)
        print(generated_song)
        # print("heyyy", generated_song)
        return jsonify({"message": "Song generation successfull", "song": generated_song }), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Song generation unsuccessfull"}), 400


if __name__ == '__main__':
    app.run(debug=True) # on my computer, have to do flask run --port 8000, or else postman doesn't give a response
    
