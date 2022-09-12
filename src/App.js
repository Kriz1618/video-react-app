import { useState, useEffect } from 'react';
import { Grid, CircularProgress } from "@material-ui/core";

import youtubeApi from './api/youtube';
import './App.css';

import { SearchBar, VideoDetail, VideoList } from './compnents';

function App() {
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ id: {}, snippet: {} });
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (searchItem) => {
    const { data: { items: videos } } = await youtubeApi.get("search", {
      params: {
        part: "snippet",
        maxResults: 6,
        key: "AIzaSyBfVFfzA8tFUsQ2RB1PHBWdxBKBHV4J1XQ",
        q: searchItem,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
    setSearching(false);
  }

  const handleSearch = (state) => {
    setSearching(state);
  }

  const getFavorites = () => {
    const savedVideos = localStorage.getItem('favorites');

    if (savedVideos) {
      setFavorites(JSON.parse(savedVideos));
    }
  }

  const handleSaveFavorite = ({ id, snippet }) => {
    console.log('44', 'id', id, favorites);
    const foundVideo = favorites.find(item => item.id.videoId === id.videoId);

    if (!foundVideo) {
      setFavorites([{ id, snippet }, ...favorites]);
    }
  }

  // const removeFavorite = ({ id: { videoId } }) => {
  //   const favoritesCopy = favorites.filter(video => video.id.videoId !== videoId);
  //   setFavorites(favoritesCopy);
  // }
  
  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Grid style={{ justifyContent: 'center' }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} onHandleSearch={handleSearch} />
          </Grid>
          <Grid item xs={8}>
            {searching && <div className='mb-2'>Loading... <CircularProgress size={20} /></div>}
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} onSaveFavorite={handleSaveFavorite} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
