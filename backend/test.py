from app import app
import requests
import pytest
import json
import bcrypt
import base64

url_server = 'http://127.0.0.1:5002'

def test_add_user():
    user_input_credentials = {'username': 'test_guy5', 'password': 'Ayush', 'prf_full_name': 'Ayush Goyal',
                              'email': 'ayushg3@illlinois.edu', 'ph_no':'2178190674', 'fav_song': 'All of Me', 'fav_genre':'Hip-Hop' }
    resp = requests.post(f"{url_server}/add_user", json = user_input_credentials) # have to change data to json to have test cases working
    
    assert 'User added sucessfully' in resp.json()['message']
    assert resp.status_code == 200
"""
    # testing failure for duplicate user
    user_input_credentials = {'username': 'user', 'password': "strongpassword"}  # same username as last user should result in a fail
    resp = requests.post(f"{url_server}/add_user", data = user_input_credentials)
    
    assert 'Username exists' in resp.json()['message'] # adding same user as before results in existing username
    assert resp.status_code == 400                     # should give an error message
"""
    

def test_authenticate_user():
    #testing correct password
    user_input_credentials = {'username': 'coolguy', 'password': "asdf"} # password same as the one the user we just added has
    resp = requests.post(f"{url_server}/authenticate", json = user_input_credentials)
    
    assert 'Successfully Authenticated' in resp.json()['message']
    assert resp.status_code == 200


    #testing wrong password
    user_input_credentials = {'username': 'coolguy', 'password': "1234"}   # password is wrong
    resp = requests.post(f"{url_server}/authenticate", json = user_input_credentials)
    
    assert 'Wrong Password' in resp.json()['message']
    assert resp.status_code == 400


"""
def test_wrong_username():
    user_input_credentials = {'username': 'superman', 'password': "asdfasdf"}   # username is wrong
    resp = requests.post(f"{url_server}/authenticate", data = user_input_credentials)
    
    assert 'User doesn\'t exist' in resp.json()['message']
    assert resp.status_code == 400
"""


def test_lyrics_wordcloud():
    song_lyrics = { "lyrics": [
        "Lyrics of song 1",
        "Lyrics of song 2",
        "Lyrics of song 3"
    ] }
    resp = requests.post(f"{url_server}/lyrics_wordcloud", json = song_lyrics)
    
    assert resp.status_code == 200
    assert 'Wordcloud generated' in resp.json()['message']
    
    with open('wordcloud_test.png', 'wb') as test_fil:
        test_fil.write(base64.b64decode(resp.json()['wordcloud_image_as_bytes']))
    

def test_search_lyrics():
    song = {"search_song": "Ahe's My Kind Of Girl"}
    resp = requests.post(f"{url_server}/search_lyrics", json = song)
    
    assert resp.status_code == 200
    assert 'Song is found' in resp.json()['message']

def test_song_recommender():
    song = {"search_song": "Ahe's My Kind Of Girl"}
    resp = requests.post(f"{url_server}/search_lyrics", json = song)
    
    assert resp.status_code == 200
    assert 'Song is found' in resp.json()['message']
    
    target_lyrics = resp.json()['lyrics']
    target_data = {"lyrics_input_data": target_lyrics}
    resp = requests.post(f"{url_server}/song_recommender", json = target_data)
    
    assert resp.status_code == 200
    assert 'Recommended song found' in resp.json()['message']
    

def test_make_song():
    songs = ["Ahe's My Kind Of Girl","Andante, Andante" , "As Good As New", "Bang", "Bang-A-Boomerang"]
    # all_lyrics = []
    # for i in range(5):
    #     song = {"search_song": songs[i]}
    #     resp = requests.post(f"{url_server}/search_lyrics", json = song)
        
    #     assert resp.status_code == 200
    #     assert 'Song is found' in resp.json()['message']
        
    #     given_lyrics = resp.json()['lyrics']
    #     all_lyrics.append(given_lyrics)
    
    input_songs_data = {"target_songs": songs}
    resp = requests.post(f"{url_server}/make_song", json = input_songs_data)
    
    assert resp.status_code == 200
    assert 'Song generation successfull' in resp.json()['message']
    
def test_get_all_songs():
    resp = requests.get(f"{url_server}/get_all_songs")
    assert resp.status_code == 200
    assert 'Songs extracted from database' in resp.json()['message']

def test_get_user_details():
    user_input_credentials = {'username': 'test_guy4', 'password': 'Ayush', 'prf_full_name': 'Ayush Goyal',
                              'email': 'ayushg3@illlinois.edu', 'ph_no':'2178190674', 'fav_song': 'All of Me', 'fav_genre':'Hip-Hop' }
    resp = requests.post(f"{url_server}/add_user", json = user_input_credentials) # have to change data to json to have test cases working
    
    assert 'User added sucessfully' in resp.json()['message']
    assert resp.status_code == 200
    
    target_usrname = "test_guy4"
    payload = {"username": target_usrname}
    resp = requests.post(f"{url_server}/get_user_details", json = payload)
    
    assert resp.status_code == 200
    assert 'User found' in resp.json()['message']