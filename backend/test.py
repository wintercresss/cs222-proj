from app import app
import requests
import pytest
import json

url_server = 'http://127.0.0.1:5000'

def test_add_user():
    user_input_credentials = {'username': 'user', 'password': "123456"}
    resp = requests.post(f"{url_server}/add_user", data = user_input_credentials)
    
    assert 'User added sucessfully' in resp.json()['message']
    assert resp.status_code == 200

    # testing failure for duplicate user
    user_input_credentials = {'username': 'user', 'password': "strongpassword"}  # same username as last user should result in a fail
    resp = requests.post(f"{url_server}/add_user", data = user_input_credentials)
    
    assert 'Username exists' in resp.json()['message'] # adding same user as before results in existing username
    assert resp.status_code == 400                     # should give an error message
    

def test_authenticate_user():
    #testing correct password
    user_input_credentials = {'username': 'user', 'password': "123456"} # password same as the one the user we just added has
    resp = requests.post(f"{url_server}/authenticate", data = user_input_credentials)
    
    assert 'Successfully Authenticated' in resp.json()['message']
    assert resp.status_code == 200

    #testing wrong password
    user_input_credentials = {'username': 'user', 'password': "1234"}   # password is wrong
    resp = requests.post(f"{url_server}/authenticate", data = user_input_credentials)
    
    assert 'Wrong Password' in resp.json()['message']
    assert resp.status_code == 400

def test_wrong_username():
    user_input_credentials = {'username': 'superman', 'password': "asdfasdf"}   # username is wrong
    resp = requests.post(f"{url_server}/authenticate", data = user_input_credentials)
    
    assert 'User doesn\'t exist' in resp.json()['message']
    assert resp.status_code == 400