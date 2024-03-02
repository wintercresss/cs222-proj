import pandas as pd

df = pd.read_csv('Spotify_Million_Song_Dataset_exported.csv')

def find_song():
    return  (df[df['song'].str.contains("new york", case=False)]) # case = false so that upper/lowercase doesn't matter


print(df[df['artist'].str.contains("taylor swift", case=False)]) # case = false so that upper/lowercase doesn't matter