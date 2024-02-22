from app import app
import requests
import pytest
import json

url_server = 'http://127.0.0.1:5000'

def test_add_user():
    user_input_credentials = {'username': 'test_user', 'password': "test_password"}
    resp = requests.post(f"{url_server}/add_user", data = user_input_credentials)
    
    assert 'User added sucessfully' in resp.json()['message']
    assert resp.status_code == 200
    

def test_authenticate_user():
    user_input_credentials = {'username': 'test_user', 'password': "test_password"}
    resp = requests.post(f"{url_server}/authenticate", data = user_input_credentials)
    
    assert 'Successfully Authenticated' in resp.json()['message']
    assert resp.status_code == 200
    
